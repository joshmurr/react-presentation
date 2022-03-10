import { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import GlobalStyle from './components/GlobalStyle'
import Slide from './components/Slide'
import Title from './components/Title'
import Textbox from './components/Textbox'
import Content from './components/Content'
import Webcam from './components/Webcam'
import Upload from './components/Upload'

const Video = styled.video`
  display: none;
`

const KEYS = {
  left: ['ArrowLeft', 'l', 'L', 'a', 'A'],
  right: ['ArrowRight', 'r', 'R', 'd', 'D'],
}

const randomRGB = (r) => {
  if (r < 0.33) return '#F00'
  if (r < 0.66) return '#0F0'
  return '#00F'
}

function App() {
  const [title, setTitle] = useState('NO DATA')
  const [slides, setSlidesInfo] = useState(null)
  const [images, setImages] = useState(null)
  const [slideNum, setSlideNum] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [hideCam, setHideCam] = useState(true)

  const videoRef = useRef(null)

  function uploadImages(e) {
    let images = {}
    const files = e.target.files

    for (let i = 0, f; (f = files[i]); i++) {
      const reader = new FileReader()

      if (f.type.match('image/*')) {
        reader.onload = (function (file) {
          return function (e) {
            images[escape(file.name)] = e.target.result
          }
        })(f)

        reader.readAsDataURL(f)
      }
    }
    setImages(images)
  }

  function uploadJSON(e) {
    const file = e.target.files[0]
    const reader = new FileReader()

    if (!file.type.match('application/json')) {
      return
    }
    reader.onload = (function (f) {
      return function (e) {
        const json = JSON.parse(e.target.result)
        setTitle(json.title)
        setSlidesInfo(json.slidesList)
      }
    })(file)

    reader.readAsText(file)
  }

  useEffect(() => {
    const upHandler = ({ key }) => {
      if (KEYS.left.includes(key)) {
        setSlideNum((prev) => Math.max(0, prev - 1))
      } else if (KEYS.right.includes(key)) {
        setSlideNum((prev) => Math.min(prev + 1, slides.length - 1))
      } else if (key === 'h') {
        setHideCam((prev) => !prev)
      }
    }
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keyup', upHandler)
    }
  }, [setSlideNum, slides])

  useEffect(() => {
    setLoaded(slides && images)
  }, [slides, images])

  let currentSlide
  if (slides) currentSlide = slides[slideNum]
  return (
    <div className="App">
      <Helmet>
        <meta charset="utf-8" />
        <title>{title}</title>
        <link rel="stylesheet" type="text/css" href="fonts.css" />
      </Helmet>
      <GlobalStyle />
      <Video ref={videoRef} autoPlay />
      <Upload name="json-file" uploadHandler={uploadJSON} />
      <Upload name="images" uploadHandler={uploadImages} />
      {loaded && (
        <Slide>
          <Title colour={randomRGB(Math.random())}>{currentSlide.title}</Title>
          <Textbox content={currentSlide.text}></Textbox>
          <Content content={currentSlide.content} images={images} />
          <Webcam videoRef={videoRef} hide={hideCam}></Webcam>
        </Slide>
      )}
    </div>
  )
}

export default App
