import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import Image from './Image'
import parseHTML from 'html-react-parser'

const Container = styled.div`
  background-color: var(--fg-col);
  border-radius: var(--b-rad);
  grid-area: content;
  padding: var(--gap);
  overflow-y: scroll;
  scrollbar-width: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(120px, 1fr));
  align-content: center;
  justify-items: center;
  gap: var(--gap);
  color: var(--text-col);
`

const Section = styled.section`
  width: 80%;
  background-color: var(--sec-col);
  border-radius: var(--b-rad);
  font-size: 3em;
`

const IFrame = styled.iframe`
  align-self: center;
  border: none;
`

const getVideo = (url) => (
  <IFrame
    title="Video"
    width="1280"
    height="720"
    src={url}
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></IFrame>
)

const UL = styled.ul`
  width: 80%;
  background-color: var(--sec-col);
  border-radius: var(--b-rad);
  list-style-type: none;
  font-size: 2em;
`
const LI = styled.li`
  margin: 8px 0;
  /* &:before {
    content: '-   ';
  } */
`

const ASIDE = styled.aside`
  text-align: center;
  font-size: 3em;
  font-family: 'Roboto Mono';
  height: 60%;
  padding: 1em 6em;
  align-self: center;
  background-color: #111;
  border-radius: var(--b-rad);
`
const Text = styled.p`
  margin: 0;
  margin-bottom: 15px;
  b {
    font-style: italic;
  }
`

const getComponent = (t, images, i) => {
  console.log(t)
  const key = Object.keys(t)[0]
  switch (key) {
    case 'image':
      return <Image src={images[t[key]]}></Image>
    case 'youtube':
      return getVideo(`https://www.youtube.com/embed/${t[key]}`)
    case 'vimeo':
      return getVideo(`https://player.vimeo.com/video/${t[key]}`)
    case 'ul':
      return (
        <UL>
          {t[key].map((li) => (
            <LI>{li}</LI>
          ))}
        </UL>
      )
    case 'aside':
      return (
        <ASIDE>
          {t[key].map((p) => (
            <Text>{p}</Text>
          ))}
        </ASIDE>
      )
    case 'text':
    default:
      return <Section key={i}>{parseHTML(t[key])}</Section>
  }
}

function Content({ content = [], images = {} }) {
  return (
    <Container>
      {content.map((thing, i) => getComponent(thing, images, i))}
    </Container>
  )
}

Content.propTypes = {
  content: PropTypes.array,
  images: PropTypes.object,
}

export default Content
