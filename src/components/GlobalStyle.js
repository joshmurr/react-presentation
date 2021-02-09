import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:ital,wght@0,400;0,700;1,300;1,500;1,700&family=Roboto:wght@400;500;700&display=swap');

:root {
	--gap: 20px;
}
body {
	overflow: hidden;
}

`

export default GlobalStyle
