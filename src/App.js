import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import GlobalStyle from './components/GlobalStyle'
//import Slideshow from './components/Slideshow'
import Slide from './components/Slide'
import Title from './components/Title'
import Textbox from './components/Textbox'
import Content from './components/Content'
import Webcam from './components/Webcam'
import Image from './components/Image'

import { slides_data } from './slides'

const Video = styled.video`
	display: none;
`

const KEYS = {
  left : ['ArrowLeft', 'l', 'L', 'a', 'A'],
  right : ['ArrowRight', 'r', 'R', 'd', 'D'],
}

function App() {
	const [slides] = useState(slides_data)
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
      <GlobalStyle />
			<Video ref={videoRef} autoPlay />
			<Slide>
				<Title>{ currentSlide.title }</Title>
				<Textbox>{ currentSlide.text }</Textbox>
				<Content>
					{ currentSlide.content.images.length > 0 ?
							currentSlide.content.images.map(img => <Image src={img}></Image>) :
							null
					}
				</Content>
				<Webcam videoRef={ videoRef }></Webcam>
			</Slide>
    </div>
  );
}

export default App;
