import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
 }
  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.white};
    font: 400 16px Open Sans, sans-serif;
 }
 a, button {
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;

 }
`
