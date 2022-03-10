import styled from 'styled-components'

const Container = styled.div`
  grid-area: title;
  padding: 10px 20px;
  background-color: var(--fg-col);
  border-radius: 20px;
`

const Text = styled.h1`
  margin: 0;
  font-size: 2.8em;
  font-family: 'Roboto', sans-serif;
  color: ${(props) => props.colour};
`

function Title({ colour, children }) {
  return (
    <Container>
      <Text colour={colour}>{children}</Text>
    </Container>
  )
}

export default Title
