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
      @media (min-width: 481px) {
        width: 70% !important;
        height: 70% !important;
      }
    }
    @media (min-width: 481px) {
      position: relative !important;
      left: 50% !important;
      display: block !important;
      transform: translate(-50%) !important;
      width: 70% !important;
      height: 70% !important;
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
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      text-align: left;
    }
    blockquote {
      border-left: 3px solid ${props => props.theme.colors.white};
      margin: 0px 12px;
      padding: 0px 6px;
      font-size: 18px;
    }
    ul,
    ol,
    p,
    img {
      padding: 10px;
    }
    p {
      width: 100%;
    }
    p,
    li,
    blockquote {
      text-align: justify;
    }
    .image {
      display: block !important;
      div {
        position: relative !important;
        display: flex !important;
        width: 100% !important;
        height: 100% !important;
        @media (min-width: 481px) {
          width: 70% !important;
          height: 70% !important;
          max-height: 80vh !important;
        }
        img.next {
          position: relative !important;
          left: 50% !important;
          display: block !important;
          transform: translate(-50%) !important;
          width: auto !important;
          height: auto !important;
          min-height: auto !important;
          max-width: auto !important;
          min-width: auto !important;
          @media (min-width: 481px) {
            max-height: 80vh !important;
          }
        }
      }
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
`
