import styled from 'styled-components'
import { useEffect, useRef } from 'react'

import { createProgram, createVAO, createTexture, initVideo } from '../webglUtils.js'

const vs = `#version 300 es
  in vec4 a_position;
  in vec2 a_texcoord;
  out vec2 v_texcoord;

  void main(){
    gl_Position = a_position;
    v_texcoord = a_texcoord * vec2(1.0, -1.0);
  }
`;
const fs = `#version 300 es
  precision mediump float;
  precision mediump sampler2D;

  uniform sampler2D u_texture;
  in vec2 v_texcoord;
  out vec4 outcolor;

  void main(){
    //outcolor = texture(u_texture, v_texcoord);
		outcolor = vec4(0.6, 0.2, 0.1, 1.0);
  }
`;

const StyledCanvas = styled.canvas`
	width: 100%;
	height: 100%;
`

const StyledVideo = styled.video`
`


export default function WebGLCam(props){
	const canvasRef = useRef(null);
	const videoRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const video = videoRef.current;
		const gl = canvas.getContext('webgl2');
		let frameID;

		const init = () => {
			const program = createProgram(gl, vs, fs);
			const attributes = {
				a_position: [-1, -1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1],
				a_texcoord: [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0],
			}
			const vao = createVAO(gl, program, attributes);

			gl.useProgram(program);

			//initVideo(video);

			const programInfo = {
				video: video,
				vao: vao,
				videoTex: createTexture(gl, gl.canvas.width, gl.canvas.height),
				videoTexLoc: gl.getUniformLocation(program, 'u_texture'),
		}

			return programInfo;
		}
		
		let programInfo = init();

		const render = () => {
			draw(gl, programInfo);
			frameID = window.requestAnimationFrame(render);
		};

		render();

		function draw(gl, program){
			//gl.bindVertexArray(program.vao);
			//gl.activeTexture(gl.TEXTURE0 + 0);
			//gl.uniform1i(program.videoTexLoc, 0);
			//gl.bindTexture(gl.TEXTURE_2D, program.videoTex);
			//gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB8, gl.RGB, gl.UNSIGNED_BYTE, program.video);

			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		}

		return () => {
			window.cancelAnimationFrame(frameID);
		};

	}, [])

	return (
		<>
			<StyledVideo autoPlay ref={videoRef}></StyledVideo>
			<StyledCanvas ref={canvasRef}></StyledCanvas>
		</>
	)
}
