import styled from 'styled-components'
import WebGLCam from './WebGLCam'

const Container = styled.div`
  background-color: grey;
	grid-area: webcam;
	/* 16:9 Aspect Ratio Trick */
	/* https://css-tricks.com/aspect-ratio-boxes/ */
	height: 0px;
	padding-top: 56.25%;
`;

function Webcam(props){
  return (
    <Container>
			<WebGLCam></WebGLCam>
    </Container>
  );
}

export default Webcam;
