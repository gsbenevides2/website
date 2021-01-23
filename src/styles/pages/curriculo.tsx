import styled, { keyframes } from 'styled-components'

const animation = keyframes`
  0%{background-position:49% 0%}
  50%{background-position:52% 100%}
  100%{background-position:49% 0%}
`
export const Container = styled.div`
  background: linear-gradient(0deg, #ef233c, #907ad6, #631d76, #9e4770);
  background-size: 800% 800%;
  animation: ${animation} 20s ease infinite;
  width: 100%;
  scroll-behavior: smooth;
`
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
  h2 {
    text-align: center;
    margin-bottom: 24px;
  }
  ul {
    li {
      text-size: 16px;
      margin-bottom: 12px;
      text-decoration: underline;
      color: white;
      transition: 0.2s;
      a {
        color: inherit;
      }
      a:hover {
        color: inherit;
      }
    }
    li:hover {
      color: black;
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
      border-radius: 20px;
      background-color: transparent;
      outline: none;
      text-transform: uppercase;
      transition: 0.2s;
    }
    button:focus {
      border-style: dashed;
      background-color: white;
      color: black;
      border-color: black;
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
      background-color: #404040;
      border-radius: 33px;
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
