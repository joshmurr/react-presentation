import styled from 'styled-components'

const Container = styled.div`
  background-color: white;
  grid-area: textbox;
  padding: 20px;
  border-radius: 15px;
  overflow-y: scroll;
  scrollbar-width: none;
`

const Text = styled.div`
  margin: 0;
  font-size: 20px;
  font-family: 'Fira Sans Condensed', sans-serif;
  font-size: 1.3em;
  line-height: 1.3em;
  h3 {
    margin: 0;
    margin-bottom: 1em;
    font-style: italic;
    font-weight: bold;
  }
`

function Textbox({ children }) {
  return (
    <Container>
      <Text dangerouslySetInnerHTML={{ __html: children }} />
    </Container>
  )
}

export default Textbox
