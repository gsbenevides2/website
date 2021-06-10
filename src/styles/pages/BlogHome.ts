import styled from 'styled-components'

export const PageContainer = styled.ul`
  margin: 10px;
  list-style: none;
  li {
    margin: 0;
    padding: 5px;
    transition: 500ms;
    gap: 5px;
    cursor: pointer;
    div {
      div {
        display: none !important;
      }
      img {
        position: relative !important;
        display: inline-block !important;
      }
    }
    &.firstPost {
      grid-row: 1/4;
      img {
        width: 100% !important;
        height: 100% !important;
      }
    }
    &.post {
      display: flex;
      flex-direction: columns;
      img {
        width: 150px !important;
        height: 100px !important;
      }
      h2 {
        font-size: 15px;
      }
      &.postA {
        grid-column: 2/4;
      }
      &.postMore {
        grid-column: 1/4;
      }
    }
    &:hover {
      color: black;
      background-color: rgba(245, 245, 245, 0.9);
      backdrop-filter: blur(15px);
      transform: scale(1.03);
      box-shadow: 0px 0px 2em #f5f5f5;
    }
  }
  @media (min-width: 481px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export const Empty = styled.div`
  width: 100%;
  text-align: center;
  img {
    width: 80% !important;
    display: inline-text !important;
  }
`
