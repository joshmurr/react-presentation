import styled from 'styled-components'

const Img = styled.img`
`;


function Image(props){
  return (
		<Img src={props.src} />
  );
}

export default Image;
