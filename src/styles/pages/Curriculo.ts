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
export const FirstPage = styled(Page)`
  flex-direction: row;
  justify-content: space-evenly;
  p {
    background-color: #474b4e;
    max-width: 480px;
    margin-right: 30px;
    padding: 12px;
    font-size: 15px;
    border-radius: 15px;
  }
  div h2 {
    text-align: center;
    margin-bottom: 24px;
  }
  div ul {
    li {
      font-size: 16px;
      margin-bottom: 12px;
      color: white;
      width: fit-content;
      transition: 0.2s;
      a {
        color: inherit;
        text-decoration: none;
        outline: none !important;
        -webkit-tap-highlight-color: transparent;
      }
      a:hover {
        color: inherit;
      }
    }
    li:hover {
      border-bottom: 1px solid white;
    }
  }
  @media (max-width: 720px) {
    flex-direction: column;
    p {
      margin: 15px;
    }
  }
`
export const CoursePage = styled(Page)<{ qtdCourses: number }>`
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
      cursor: pointer;
      border: 1px solid transparent;
      padding: 10px 15px;
      color: white;
      font-size: 30px;
      border-radius: 12px;
      background-color: transparent;
      outline: none;
      text-transform: uppercase;
      transition: 0.2s;
      outline: none !important;
      -webkit-tap-highlight-color: transparent;
    }
    button:focus {
      border-style: dashed;
      background-color: white;
      color: black;
      border-color: black;
      .icon {
        stroke: black;
      }
    }
  }
  ul {
    width: calc(${props => props.qtdCourses} * 100%);
    list-style: none;
    margin: 10px 0px 0px 0px;
    padding: 0;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    position: relative;
    gap: 10px;
    left: calc(var(--selected-course) * -100%);
    transition: left 0.4s;
    li {
      margin: 0;
      padding: 25px;
      background-color: #474b4e;
      border-radius: 15px;
      h3 {
        margin-bottom: 5.5px;
      }
      p {
        margin: 2.5px 0px;
      }
      a {
        color: white;
      }
      a:hover {
        color: white;
      }
    }
  }
  .slider {
    margin-top: 10px;
    gap: 5px;
    button {
      color: white;
      font-size: 30px;
      background-color: transparent;
      outline: none;
      border: none;
    }
  }
`

export const WorkshopPage = styled(Page)<{ qtdWorkshops: number }>`
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
      cursor: pointer;
      border: 1px solid transparent;
      padding: 10px 15px;
      color: white;
      font-size: 30px;
      border-radius: 12px;
      background-color: transparent;
      outline: none;
      text-transform: uppercase;
      transition: 0.2s;
      outline: none !important;
      -webkit-tap-highlight-color: transparent;
    }
    button:focus {
      border-style: dashed;
      background-color: white;
      color: black;
      border-color: black;
      .icon {
        stroke: black;
      }
    }
  }
  ul {
    width: calc(${props => props.qtdWorkshops} * 100%);
    list-style: none;
    margin: 10px 0px 0px 0px;
    padding: 0;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    position: relative;
    gap: 10px;
    left: calc(var(--selected-workshop) * -100%);
    transition: left 0.4s;
    li {
      margin: 0;
      padding: 25px;
      background-color: #474b4e;
      border-radius: 15px;
      h3 {
        margin-bottom: 5.5px;
      }
      p {
        margin: 2.5px 0px;
      }
      a {
        color: white;
      }
      a:hover {
        color: white;
      }
    }
  }
  .slider {
    margin-top: 10px;
    gap: 5px;
    button {
      color: white;
      font-size: 30px;
      background-color: transparent;
      outline: none;
      border: none;
    }
  }
`
export const LanguagesPage = styled(Page)<{ qtdLanguages: number }>`
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
      cursor: pointer;
      border: 1px solid transparent;
      padding: 10px 15px;
      color: white;
      font-size: 30px;
      border-radius: 12px;
      background-color: transparent;
      outline: none;
      text-transform: uppercase;
      transition: 0.2s;
      outline: none !important;
      -webkit-tap-highlight-color: transparent;
    }
    button:focus {
      border-style: dashed;
      background-color: white;
      color: black;
      border-color: black;
      .icon {
        stroke: black;
      }
    }
  }
  ul {
    width: calc(${props => props.qtdLanguages} * 100%);
    list-style: none;
    margin: 10px 0px 0px 0px;
    padding: 0;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    position: relative;
    gap: 10px;
    left: calc(var(--selected-language) * -100%);
    transition: left 0.4s;
    li {
      margin: 0;
      padding: 25px;
      background-color: #474b4e;
      border-radius: 15px;
      h3 {
        margin-bottom: 5.5px;
      }
      p {
        margin: 2.5px 0px;
      }
      a {
        color: white;
      }
      a:hover {
        color: white;
      }
    }
  }
  .slider {
    margin-top: 10px;
    gap: 5px;
    button {
      color: white;
      font-size: 30px;
      background-color: transparent;
      outline: none;
      border: none;
    }
  }
`
