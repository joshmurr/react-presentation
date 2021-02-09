import { useState, useRef } from 'react'
import styled from 'styled-components'

import GlobalStyle from './components/GlobalStyle'
import Slideshow from './components/Slideshow'

import { slides_data } from './slides'

const Video = styled.video`
	postion: absolute;
	top: 0;
	left: 0;
`

function App() {
  const [slideNum, setSlideNum] = useState(0)
	const videoRef = useRef(null);
  return (
    <div className="App">
      <GlobalStyle />
			<Slideshow
				data={slides_data}
				slide={slideNum}
				onSlideChange={setSlideNum}
				videoRef={videoRef}
			/>
			<Video ref={videoRef} autoPlay></Video>
    </div>
  );
}

export default App;
