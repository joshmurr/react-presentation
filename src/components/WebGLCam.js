import styled from 'styled-components'
import { useEffect, useRef } from 'react'

import { createProgram, createTexture, setupVertexAttribs } from '../webglUtils.js'

const vs = `#version 300 es
  in vec4 a_position;
  in vec2 a_texcoord;
  out vec2 v_texcoord;

  void main(){
    gl_Position = a_position * vec4(vec2(-1.0), vec2(1.0));
    v_texcoord = a_texcoord;
  }
`;
const fs = `#version 300 es
  precision mediump float;
  precision mediump sampler2D;

  uniform sampler2D u_texture;
  in vec2 v_texcoord;
  out vec4 outcolor;

	float KERNEL[16] = float[](0.0, 0.5, 0.125, 0.625, 0.75, 0.25, 0.875, 0.375, 0.1875, 0.6875, 0.0625, 0.5625, 0.9375, 0.4375, 0.8125, 0.3125);

  float dither(float c) {
    float closestColor = step(.5, c);
    float secondClosestColor = 1.0 - closestColor;
    int x = int(mod(gl_FragCoord.x, 4.0));
    int y = int(mod(gl_FragCoord.y, 4.0));
    float d = KERNEL[(x + y * 4)];
    float dd = abs(closestColor - c);
    return (dd < d) ? closestColor : secondClosestColor;
  }

  float brightness(vec3 c){
    return 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;
  }

  void main(){
		//float bright = brightness(texture(u_texture, v_texcoord).rgb);
		//outcolor = vec4(vec3(dither(bright)), 1.0);

		outcolor = texture(u_texture, v_texcoord) * 0.5;
  }
`;

const StyledCanvas = styled.canvas`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`

export default function WebGLCam({ videoRef }){
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const video = videoRef.current;
		const gl = canvas.getContext('webgl2');
		let frameID;

		const init = () => {
			const program = createProgram(gl, vs, fs);
			setupVertexAttribs(gl, program);
			gl.useProgram(program);

			const programInfo = {
				video: video,
				videoTex: createTexture(gl, gl.canvas.width, gl.canvas.height),
				videoTexLoc: gl.getUniformLocation(program, 'u_texture'),
				dither: false,
			}

			return programInfo;
		}
		
		let programInfo = init();

		const render = () => {
			if(video.srcObject) draw(gl, programInfo);
			frameID = window.requestAnimationFrame(render);
		};

		render();

		function draw(gl, program){
			gl.activeTexture(gl.TEXTURE0 + 0);
			gl.uniform1i(program.videoTexLoc, 0);
			gl.bindTexture(gl.TEXTURE_2D, program.videoTex);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB8, gl.RGB, gl.UNSIGNED_BYTE, program.video);

			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		}

		return () => {
			window.cancelAnimationFrame(frameID);
		};

	}, [videoRef])

	return (
		<>
			<StyledCanvas ref={canvasRef}></StyledCanvas>
		</>
	)
}
