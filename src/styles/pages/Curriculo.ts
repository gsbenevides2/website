import styled from 'styled-components'

export const Page = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const SectionPage = styled.section`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
export const FirstPage = styled(Page)`
  flex-direction: row;
  justify-content: space-evenly;
  p {
    background-color: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.sizes.borderRadius};
    max-width: 480px;
    margin-right: 30px;
    padding: 12px;
    font-size: 15px;
  }
  div h2 {
    text-align: center;
    margin-bottom: 24px;
  }
  div ul {
    li {
      font-size: 16px;
      margin-bottom: 12px;
      color: ${props => props.theme.colors.white};
      width: fit-content;
      transition: 0.2s;
      cursor: pointer;
      a {
        color: inherit;
        text-decoration: none;
        outline: none !important;
      }
      a:hover {
        color: inherit;
      }
    }
    li:hover {
      border-bottom: 1px solid ${props => props.theme.colors.white};
    }
  }
  @media (max-width: 720px) {
    flex-direction: column;
    p {
      margin: 15px;
    }
  }
`
interface ListProps {
  length: number
  name: string
}
export const ListPage = styled(SectionPage)<ListProps>`
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  .top {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    button {
      border: 1px solid transparent;
      padding: 10px 15px;
      color: white;
      font-size: 30px;
      border-radius: ${props => props.theme.sizes.borderRadius};
      background-color: transparent;
      outline: none;
      text-transform: uppercase;
      transition: 0.2s;
      outline: none !important;
    }
    button:focus {
      border-style: dashed;
      background-color: ${props => props.theme.colors.white};
      color: ${props => props.theme.colors.black};
      border-color: ${props => props.theme.colors.black};
      .icon {
        stroke: ${props => props.theme.colors.black};
      }
    }
  }
  ul {
    width: calc(${props => props.length} * 100%);
    list-style: none;
    margin: 10px 0px 0px 0px;
    padding: 0;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    position: relative;
    gap: 10px;
    left: calc(var(--selected-${props => props.name}) * -100%);
    transition: left 0.4s;
    li {
      background-color: ${props => props.theme.colors.primary};
      border-radius: ${props => props.theme.sizes.borderRadius};
      margin: 0;
      padding: 25px;
      h3 {
        margin-bottom: 5.5px;
      }
      p {
        margin: 2.5px 0px;
      }
      a {
        color: ${props => props.theme.colors.white};
      }
      a:hover {
        color: ${props => props.theme.colors.white};
      }
    }
  }
  .slider {
    margin-top: 10px;
    gap: 5px;
    button {
      color: ${props => props.theme.colors.white};
      font-size: 30px;
      background-color: transparent;
      outline: none;
      border: none;
    }
  }
`
