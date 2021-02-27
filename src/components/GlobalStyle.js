import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
	:root {
		--gap: 20px;
		--b-rad: 20px;
	}
	body {
		overflow: hidden;
		font-family: 'Fira Sans Condensed', sans-serif;
	}
`

export default GlobalStyle
