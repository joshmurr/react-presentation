import styled from 'styled-components'

const Container = styled.div`
  background-color: white;
	grid-area: textbox;
	padding: 10px;
	border-radius: 15px;
`;


function Textbox(props){
  return (
    <Container>
      <p>{ props.children }</p>
    </Container>
  );
}

export default Textbox;
