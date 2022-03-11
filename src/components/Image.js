import PropTypes from 'prop-types'
import styled from 'styled-components'

const Img = styled.img`
  max-width: 100%;
  max-height: 90%;
  align-self: center;
`

function Image({ src }) {
  return <Img src={src} />
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
}

export default Image
