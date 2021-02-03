import styled from 'styled-components'

const Container = styled.div`
  background-color: white;
	grid-area: title;
	padding: 10px;
`;

const Text = styled.h1`
  
`;

function Title(props){
  return (
    <Container>
      <Text>{ props.children }</Text>
    </Container>
  );
}

export default Title;
