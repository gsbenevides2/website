import styled from 'styled-components'

export const Container = styled.article`
  padding: 12px;
  width: 100%;
  max-width: 600px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  div:not(.content) {
    div {
      display: none !important;
    }
    img.thumb {
      position: relative !important;
      width: 100% !important;
      display: inline-block !important;
      height: 100% !important;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 15px;
  }
  .content {
    text-align: justify;
    ul,
    ol,
    p,
    img {
      padding: 10px;
    }
    img.next {
      position: relative !important;
      left: 50% !important;
      display: block !important;
      transform: translate(-50%) !important;
      width: 100% !important;
      height: 100% !important;
    }
    div {
      position: relative;
      display: block !important;
      width: 100% !important;
      height: 100% !important;
    }
    ul,
    ol {
      margin-left: 12px;
    }
    a {
      color: ${props => props.theme.colors.white};
      &:hover {
        color: ${props => props.theme.colors.white};
      }
    }
  }
  @media (min-width: 481px) {
    img {
      width: 70%;
    }
  }
`
