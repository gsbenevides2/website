import styled from 'styled-components'

export const Container = styled.div`
  padding: 12px;
  width: 100%;
  max-width: 600px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  img {
    width: 100%;
    display: inline-block;
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
    img {
      position: relative;
      left: 50%;
      transform: translate(-50%);
    }
    ul,
    ol {
      margin-left: 12px;
    }
    a {
      color: white;
      &:hover {
        color: white;
      }
    }
  }
  @media (min-width: 481px) {
    img {
      width: 70%;
    }
  }
`
