import styled from 'styled-components'

const Container = styled.div`
  background-color: #DDD;
	border-radius: 20px;
	grid-area: content;
	padding: var(--gap);
	overflow-y: scroll;
	scrollbar-width: none;
	display: flex;
	align-items: center;
	justify-content: center;
`;

function Content(props){
  return (
    <Container>
      { props.children }
    </Container>
  );
}

export default Content;
