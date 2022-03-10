import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import parseHTML from 'html-react-parser'

const Container = styled.div`
  background-color: var(--fg-col);
  grid-area: textbox;
  padding: 20px;
  border-radius: 15px;
  overflow-y: scroll;
  scrollbar-width: none;
  font-size: 1.3em;
  line-height: 1.3em;
  color: var(--textbox-font-col);
`

const H3 = styled.h3`
  margin: 0;
  margin-bottom: 1em;
  font-style: italic;
  font-weight: bold;
`
const OL = styled.ol`
  margin: 0;
  padding: 0 20px;
`
const LI = styled.li``

const Text = styled.p`
  margin: 0;
  margin-bottom: 15px;
  b {
    font-style: italic;
  }
`

const getComponent = (t) => {
  const key = Object.keys(t)[0]
  switch (key) {
    case 'h3':
      return <H3>{t[key]}</H3>
    case 'ol':
      return (
        <OL>
          {t[key].map((li) => (
            <LI>{parseHTML(li)}</LI>
          ))}
        </OL>
      )
    case 'p':
    case 'text':
    default:
      return <Text>{parseHTML(t[key])}</Text>
  }
}

function Textbox({ content = [] }) {
  let children =
    typeof content === 'string' ? parseHTML(content) : content.map(getComponent)
  return <Container>{children}</Container>
}

Textbox.propTypes = {
  content: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}

export default Textbox
