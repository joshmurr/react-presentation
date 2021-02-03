import styled from 'styled-components'

const Container = styled.div`
  background-color: grey;
	grid-area: webcam;
	padding: 10px;
`;


function Webcam(props){
  return (
    <Container>
      <p>{ props.children }</p>
    </Container>
  );
}

export default Webcam;
