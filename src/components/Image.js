import styled from 'styled-components'

const Img = styled.img`
	max-width: 100%;
	max-height: 100%;
`;


function Image(props){
  return (
		<Img src={props.src} />
  );
}

export default Image;
