import styled from 'styled-components'

export const Container = styled.div`
  padding: 12px;
  width: 100%;
  text-align: center;
  img {
    width: 100%;
    display: inline-block;
  }
  .content {
    text-align: justify;
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
