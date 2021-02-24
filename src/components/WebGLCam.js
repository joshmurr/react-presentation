import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { vs, swirl_fs } from './shaders'

import {
  createProgram,
  createTexture,
  setupVertexAttribs,
} from '../webglUtils.js'

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export default function WebGLCam({ videoRef, hide }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    const gl = canvas.getContext('webgl2')
    let frameID

    const init = () => {
      const program = createProgram(gl, vs, swirl_fs)
      setupVertexAttribs(gl, program)
      gl.useProgram(program)

      const programInfo = {
        video: video,
        videoTex: createTexture(gl, gl.canvas.width, gl.canvas.height),
        videoTexLoc: gl.getUniformLocation(program, 'u_texture'),
        u_time: gl.getUniformLocation(program, 'u_time'),
        u_time_val: 0,
        u_effect_val: hide,
        u_effect: gl.getUniformLocation(program, 'u_effect'),
        dither: false,
      }

      return programInfo
    }

    let programInfo = init()

    const render = () => {
      if (video.srcObject) draw(gl, programInfo)
      frameID = window.requestAnimationFrame(render)
    }

    render()

    function draw(gl, program) {
      gl.activeTexture(gl.TEXTURE0 + 0)
      gl.uniform1i(program.videoTexLoc, 0)
      gl.bindTexture(gl.TEXTURE_2D, program.videoTex)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGB8,
        gl.RGB,
        gl.UNSIGNED_BYTE,
        program.video
      )
      gl.uniform1f(program.u_time, program.u_time_val)
      gl.uniform1f(program.u_effect, program.u_effect_val)

      program.u_time_val += 0.01

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    return () => {
      window.cancelAnimationFrame(frameID)
    }
  }, [videoRef, hide])

  return (
    <>
      <StyledCanvas ref={canvasRef}></StyledCanvas>
    </>
  )
}
