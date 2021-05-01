import styled, { keyframes } from 'styled-components'

import { Container as GradientContainer } from '../commons/GradientContainer'

export const Container = styled(GradientContainer)`
  scroll-behavior: auto;
  padding: 33px;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  .content {
    max-width: 780px;
    width: 100%;
  }
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
