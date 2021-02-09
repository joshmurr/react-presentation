import styled from 'styled-components'

const Container = styled.div`
  background-color: lightgrey;
  position: absolute;
  top: 0px;
  left: 0px;
  width: calc(100vw - (var(--gap) * 2));
  height: calc(100vh - (var(--gap) * 2));
	padding: var(--gap);
	overflow: none;


  display: grid;
  grid-template-columns: 1.6fr 0.4fr;
  grid-template-rows: 0.3fr 2.1fr 0.6fr;
  gap: var(--gap) var(--gap);
  grid-template-areas:
    "title textbox"
    "content textbox"
    "content webcam"; 
`;


function Slide(props){
  return (
    <Container>
      { props.children }
    </Container>
  );
}

export default Slide;
