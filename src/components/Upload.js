import styled from 'styled-components'

const FormGroup = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  grid-area: content;
`

function Upload({ uploadHandler, show }) {
  return (
    <FormGroup show={true}>
      <input type="file" name="slides_data" onChange={uploadHandler} multiple />
    </FormGroup>
  )
}

export default Upload
