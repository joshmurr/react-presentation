import styled from 'styled-components'

const Container = styled.div`
  grid-area: title;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--fg-col);
  border-radius: var(--b-rad);
`

const Text = styled.h1`
  margin: 0;
  font-size: 2.8em;
  font-family: 'Roboto Mono', sans-serif;
  font-style: italic;
`

function Title({ colour, children }) {
  return (
    <Container>
      <Text colour={colour}>{children}</Text>
    </Container>
  )
}

export default Title
