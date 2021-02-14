import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import Image from './Image'

const Container = styled.div`
  background-color: #DDD;
	border-radius: 20px;
	grid-area: content;
	padding: var(--gap);
	overflow-y: scroll;
	scrollbar-width: none;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Text = styled.p`
	color: red;
`

const isImage = (item) => (
	item.startsWith('/static/media/', 0) || item.startsWith('data:image', 0)
)

function Content({ content=[] }){
  return (
    <Container>
			{ content.map(item => (
					isImage(item) ?
						<Image src={item}></Image> :
						<Text>{ item }</Text>
			))
			}
    </Container>
  );
}

Content.propTypes = {
	content: PropTypes.array,
}

export default Content;
