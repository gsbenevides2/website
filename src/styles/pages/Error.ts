import styled from 'styled-components'

import { Container as GradientContainer } from '../../styles/commons/GradientContainer'

export const Container = styled(GradientContainer)`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  align-items: center;
  justify-content: center;
  .card {
    width: 80%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #474b4e;
    border-radius: 15px;
    padding: 22px;
    img {
      background-color: white;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h1 {
      font-weight: 400;
      text-align: center;
    }
    p {
      text-align: justify;
    }
    a {
      background-color: #535353;
      border: none;
      width: 100%;
      border-radius: 12px;
      cursor: pointer;
      outline: none !important;
      -webkit-tap-highlight-color: transparent;

      padding: 10px;
      font-size: 14pt;
      color: white;
      text-decoration: none;
      margin-top: 5px;

      display: flex;
      justify-content: center;

      transition: 2ms transform, 1ms background-color;
      &:after {
        content: 'Bora navegar?';
      }
      &:hover {
        background-color: #595a5d;
        transform: scale(1.05);
        &:after {
          content: "Let's Go";
        }
      }
    }
  }
`
