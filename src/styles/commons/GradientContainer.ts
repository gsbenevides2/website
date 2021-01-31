import styled, { keyframes } from 'styled-components'

const animation = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`
export const Container = styled.div`
  background: linear-gradient(270deg, #000000, #434343);
  background-size: 400% 400%;
  animation: ${animation} 20s ease infinite;
  width: 100%;
  scroll-behavior: smooth;
`
