import { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import GlobalStyle from './components/GlobalStyle'
import Slide from './components/Slide'
import Title from './components/Title'
import Textbox from './components/Textbox'
import Content from './components/Content'
import Webcam from './components/Webcam'

import { slides_data } from './slides'

const Video = styled.video`
	display: none;
`

const KEYS = {
  left : ['ArrowLeft', 'l', 'L', 'a', 'A'],
  right : ['ArrowRight', 'r', 'R', 'd', 'D'],
}

function App() {
	const { title, slidesList } = slides_data
	const [slides] = useState(slidesList)
  const [slideNum, setSlideNum] = useState(0)
	const videoRef = useRef(null)

  useEffect(() => {
		const upHandler = ({ key}) => {
			if (KEYS.left.includes(key)) {
				setSlideNum(prev => Math.max(0, prev - 1));
			} else if (KEYS.right.includes(key)) {
				setSlideNum(prev => Math.min(prev + 1, slides.length - 1));
			}
		};
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [setSlideNum, slides])

	const currentSlide = slides[slideNum]
  return (
    <div className="App">
			<Helmet>
				<meta charset="utf-8" />
				<title>{ title }</title>
				<link rel="stylesheet" type="text/css" href="fonts.css" />
			</Helmet>
      <GlobalStyle />
			<Video ref={videoRef} autoPlay />
			<Slide>
				<Title>{ currentSlide.title }</Title>
				<Textbox>{ currentSlide.text }</Textbox>
				<Content
					content={currentSlide.content}
				/>
				<Webcam videoRef={ videoRef }></Webcam>
			</Slide>
    </div>
  );
}

export default App;
