import { useEffect } from 'react'
import styled from 'styled-components'
import WebGLCam from './WebGLCam'
import { initVideo } from '../webglUtils.js'

const Container = styled.div`
  position: relative;
  overflow: hidden;
  background-color: grey;
  grid-area: webcam;
  /* 16:9 Aspect Ratio Trick */
  /* https://css-tricks.com/aspect-ratio-boxes/ */
  height: 0px;
  padding-top: 56.25%;
  border-radius: var(--b-rad);
`

function Webcam({ videoRef, hide }) {
  useEffect(() => {
    window.addEventListener('click', () => initVideo(videoRef.current))
    return () => {
      window.removeEventListener('click', () => initVideo(videoRef))
    }
  }, [videoRef])

  return (
    <Container>
      <WebGLCam videoRef={videoRef} hide={hide}></WebGLCam>
    </Container>
  )
}

export default Webcam
