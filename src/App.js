import GlobalStyle from './components/GlobalStyle'
import Slide from './components/Slide'
import Title from './components/Title'
import Textbox from './components/Textbox'
import Content from './components/Content'
import Webcam from './components/Webcam'
import Image from './components/Image'

import { slides_data } from './slides'

function App() {
  const slides = slides_data.map(slide => {
    return (
      <Slide>
        <Title>{ slide.title }</Title>
        <Textbox>{ slide.text }</Textbox>
        <Content>
          { slide.content.images.map(img => <Image src={img}></Image>) }
        </Content>
        <Webcam>This is the webcam.</Webcam>
      </Slide>
    )
  });


  return (
    <div className="App">
      <GlobalStyle />
      { slides }
    </div>
  );
}

export default App;
