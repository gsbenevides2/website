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
    background-color: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.sizes.borderRadius};
    padding: 22px;
    img {
      background: ${props => props.theme.colors.white};
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
      background-color: ${props => props.theme.colors.seccoundary};
      border: none;
      width: 100%;
      border-radius: ${props => props.theme.sizes.borderRadius};
      outline: none !important;

      padding: 10px;
      font-size: 14pt;
      color: ${props => props.theme.colors.white};
      text-decoration: none;
      margin-top: 5px;

      display: flex;
      justify-content: center;

      transition: 2ms transform, 1ms background-color;
      &:after {
        content: 'Bora navegar?';
      }
      &:hover {
        background-color: ${props => props.theme.colors.accent};
        transform: scale(1.05);
        &:after {
          content: "Let's Go";
        }
      }
    }
  }
`
