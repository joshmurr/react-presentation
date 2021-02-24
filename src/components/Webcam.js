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
  border-radius: 15px;
`

function Webcam({ videoRef, hide }) {
  const videoHandler = () => {
    initVideo(videoRef.current)
  }
  useEffect(() => {
    window.addEventListener('click', videoHandler)
    return () => {
      window.removeEventListener('click', videoHandler)
    }
  }, [videoHandler]) // Empty array ensures that effect is only run on mount and unmount

  return (
    <Container>
      <WebGLCam videoRef={videoRef} hide={hide}></WebGLCam>
    </Container>
  )
}

export default Webcam
