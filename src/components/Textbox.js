import styled from 'styled-components'

const Container = styled.div`
  background-color: white;
	grid-area: textbox;
	padding: 20px;
	border-radius: 15px;
	overflow-y: scroll;
	scrollbar-width: none;
`;

const Text = styled.p`
	margin: 0;
	font-size: 20px;
	font-family: 'Fira Sans Condensed', sans-serif;
`


function Textbox({ children }){
  return (
    <Container>
			<Text dangerouslySetInnerHTML={{__html: children}} />
    </Container>
  );
}

export default Textbox;
