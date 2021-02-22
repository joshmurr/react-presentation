import styled from 'styled-components'

const Container = styled.div`
  grid-area: title;
  padding: 10px 20px;
  background-color: #ddd;
  border-radius: 20px;
`

const Text = styled.h1`
  margin: 0;
  font-size: 2.8em;
  font-family: 'Roboto', sans-serif;
`

function Title({ children }) {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  )
}

export default Title
