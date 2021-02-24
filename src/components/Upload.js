import styled from 'styled-components'

const FormGroup = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  grid-area: content;
`

const tidy = (word) => {
  return (
    word
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') + ':  '
  )
}

function Upload({ uploadHandler, name, show }) {
  return (
    <FormGroup show={true}>
      <label for={name}>{tidy(name)}</label>
      <input
        id={name}
        type="file"
        name="slides_data"
        onChange={uploadHandler}
        multiple
      />
    </FormGroup>
  )
}

export default Upload
