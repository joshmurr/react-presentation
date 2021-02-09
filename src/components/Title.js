import styled from 'styled-components'

const Container = styled.div`
	grid-area: title;
	padding: 10px;
  background-color: #DDD;
	border-radius: 20px;
`;

const Text = styled.h1`
  margin: 0; 
	font-size: 2.8em;
	font-family: 'Roboto', sans-serif;
`;

function Title(props){
  return (
    <Container>
      <Text>{ props.children }</Text>
    </Container>
  );
}

export default Title;
