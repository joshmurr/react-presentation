import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import Image from './Image'

const Container = styled.div`
  background-color: #ddd;
  border-radius: var(--b-rad);
  grid-area: content;
  padding: var(--gap);
  overflow-y: scroll;
  scrollbar-width: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-template-rows: 1fr;
  align-items: center;
  justify-content: center;
  gap: var(--gap);
`

const Item = styled.div`
  display: grid;
  justify-items: center;
  align-content: center;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fit, minmax(320px, 1fr));
`

const Text = styled.div`
  //margin: 20px;
  width: 94%;
  padding: 20px;
  background-color: lightgrey;
  border-radius: var(--b-rad);
  font-family: 'Fira Sans Condensed', sans-serif;
  font-size: 2em;
  justify-self: left;
  h3 {
    margin: 0;
    padding: 0;
  }
  section {
    justify-self: left;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li::before {
      content: '-   ';
    }
  }
`
const isImage = (item) =>
  item.startsWith('/static/media/', 0) ||
  item.startsWith('data:image', 0) ||
  item.match(/.*\.(gif|jpe?g|bmp|png|svg)$/gim)

const getComponent = (t, images) => {
  if (isImage(t)) {
    return <Image src={images[t]}></Image>
  } else if (t.length === 11) {
    return (
      <iframe
        title={t}
        width="1280"
        height="720"
        src={`https://www.youtube.com/embed/${t}`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    )
  } else if (t.length === 8 || t.length === 9) {
    return (
      <iframe
        title={t}
        src={`https://player.vimeo.com/video/${t}`}
        width="1280"
        height="720"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>
    )
  } else {
    return <Text dangerouslySetInnerHTML={{ __html: t }} />
  }
}

function Content({ content = [], images = {} }) {
  return (
    <Container>
      {content.map((thing) => (
        <Item>{getComponent(thing, images)}</Item>
      ))}
    </Container>
  )
}

Content.propTypes = {
  content: PropTypes.array,
}

export default Content
