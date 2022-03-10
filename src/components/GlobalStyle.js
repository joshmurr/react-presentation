import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
	:root {
		--gap: 20px;
		--b-rad: 20px;
		--bg-col: #111;
		--fg-col: #000;
		--sec-col: #111;
		--textbox-font-col: #DDD;
	}
	body {
		overflow: hidden;
		font-family: 'Fira Sans Condensed', sans-serif;
	}
`

export default GlobalStyle
