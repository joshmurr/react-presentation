import { useEffect, useState } from 'react'
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
`

const Item = styled.div`
  display: grid;
  justify-items: center;
  align-content: center;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fit, minmax(320px, 1fr));
`

const Text = styled.div`
  width: 80%;
  margin: 20px;
  padding: 20px;
  background-color: grey;
  border-radius: var(--b-rad);
  font-family: 'Fira Sans Condensed', sans-serif;
  font-size: 2em;
  h3 {
    margin: 0;
    padding: 0;
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
  item.includes('image')

//const reader = (file) => {
  //return new Promise((resolve, reject) => {
    //const fileReader = new FileReader()
    //fileReader.onload = () => resolve(fileReader.result)
    //fileReader.readAsDataURL(file)
  //})
//}

//function getDataUrl(path, imgURLSetter) {
  //const absPath = path.replace(
    //'.',
    //'/home/joshmurr/Documents/CCI/visualisation_and_sensing/week_01/slides'
  //)
  //fetch(absPath)
    //.then((r) => r.blob())
    //.then((blobFile) => new File([blobFile], 'tmpName', { type: 'image/png' }))
    //.then((file) => reader(file))
    //.then((result) => imgURLSetter(result))
    //.catch((err) => console.log(err))
//}

const getComponent = (t) => {
  if (isImage(t)) {
    return <Image src={t}></Image>
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
  } else {
    return <Text dangerouslySetInnerHTML={{ __html: t }} />
  }
}

function Content({ content = [] }) {
  return (
    <Container>
      {content.map((thing) => (
        <Item>{getComponent(thing)}</Item>
      ))}
    </Container>
  )
}

Content.propTypes = {
  content: PropTypes.array,
}

export default Content
