import { useEffect } from 'react'
import Slide from './Slide'
import Title from './Title'
import Textbox from './Textbox'
import Content from './Content'
import Webcam from './Webcam'
import Image from './Image'

const KEYS = {
  left : ['ArrowLeft', 'l', 'L', 'a', 'A'],
  right : ['ArrowRight', 'r', 'R', 'd', 'D'],
}

function Slideshow(props){
  const upHandler = ({ key}) => {
    if (KEYS.left.includes(key)) {
			props.onSlideChange(prev => Math.max(0, prev - 1));
    } else if (KEYS.right.includes(key)) {
			props.onSlideChange(prev => Math.min(prev + 1, props.data.length - 1));
		}
  };

  const slides = props.data.map((slide, i) => {
    return (
      <Slide key={i}>
        <Title>{ slide.title }</Title>
        <Textbox>{ slide.text }</Textbox>
        <Content>
          { slide.content.images.map(img => <Image src={img}></Image>) }
        </Content>
        <Webcam videoRef={props.videoRef}>This is the webcam.</Webcam>
      </Slide>
    )
  });

  useEffect(() => {
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return (
		<>
			{ slides[props.slide] }
		</>
  );
}

export default Slideshow;
