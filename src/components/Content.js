import styled from 'styled-components'

const Container = styled.div`
  background-color: white;
	grid-area: content;
	padding: var(--gap);
	overflow-y: scroll;
	scrollbar-width: none;
`;

function Content(props){
  return (
    <Container>
      { props.children }
    </Container>
  );
}

export default Content;
