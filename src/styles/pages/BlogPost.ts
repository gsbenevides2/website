import styled from 'styled-components'

export const Container = styled.div`
  margin: 12px;
  width: 100%;
  text-align: center;
  img {
    width: 100%;
    display: inline-block;
  }
  .content {
    margin: 12px;
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
