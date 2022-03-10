import { createGlobalStyle } from 'styled-components'
import RobotoMono from '../assets/fonts/roboto/RobotoMono-VariableFont_wght.ttf'
import RobotoMonoItalic from '../assets/fonts/roboto/RobotoMono-Italic-VariableFont_wght.ttf'

const GlobalStyle = createGlobalStyle`
	:root {
		--gap: 5px;
		--b-rad: 10px;
		--bg-col: #000;
		--fg-col: #000;
		--sec-col: #111;
		--text-col: #DDD;
	}
	body {
		overflow: hidden;
		font-family: 'Fira Sans Condensed', sans-serif;
	}
  @font-face {
    font-family: 'Roboto Mono';
    src: url(${RobotoMono}), url(${RobotoMonoItalic});
	 }
`

export default GlobalStyle
