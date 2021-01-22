import styled, { keyframes } from 'styled-components'

const animation = keyframes`
  0%{background-position:49% 0%}
  50%{background-position:52% 100%}
  100%{background-position:49% 0%}
`
export const Container = styled.div`
  background: linear-gradient(0deg, #ef233c, #907ad6, #631d76, #9e4770);
  background-size: 800% 800%;
  animation: ${animation} 20s ease infinite;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  padding: 33px;
  h1 {
    text-align: center;
    margin-bottom: 12px;
  }
  a {
    color: white;
    transition: 2s;
  }
  a:hover {
    color: black;
  }
`
const CodeAnimationFour = keyframes`
 0%{font-size: 200px}
 50%{font-size: 150px}
 100%{font-size: 200px}
`
const CodeAnimationZero = keyframes`
 0%{font-size: 150px}
 50%{font-size: 200px}
 100%{font-size: 150px}
`
export const Code = styled.div`
  text-align: center;
  width: 100%;
  height: 200px;
  span:nth-child(1) {
    font-size: 200px;
    animation: ${CodeAnimationFour} 2s ease infinite;
  }
  span:nth-child(2) {
    font-size: 150px;
    animation: ${CodeAnimationZero} 2s ease infinite;
  }
  span:nth-child(3) {
    font-size: 200px;
    animation: ${CodeAnimationFour} 2s ease infinite;
  }
`
