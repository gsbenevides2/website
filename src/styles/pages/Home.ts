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
  img {
    width: 9rem;
    border-radius: 50%;
    margin-bottom: 1.3rem;
  }
  text-align: center;
  button {
    cursor: pointer;
    border: 1.5px solid white;
    padding: 10px 15px;
    color: white;
    font-size: 25px;
    margin-top: 1rem;
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
`
export const SeccoundPage = styled(Page)`
  p {
    width: 80%;
    font-size: 0.9rem;
  }
  button {
    cursor: pointer;
    border: 1px solid white;
    padding: 10px 15px;
    color: white;
    font-size: 1rem;
    margin-top: 1rem;
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
  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`
export const ButtonArea = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  button {
    font-size: 30px;
    color: white;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    border: none;
    transition: 0.2s;
  }
  button:focus {
    border-style: dashed;
    background-color: white;
    color: black;
    border-color: black;
  }
`
export const SocialTable = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
export const SocialItem = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
  display: block;
  padding: 12px;
  margin: 10px;
  background-color: transparent;
  border-radius: 10px;
  color: white;
  transition: 0.2s;
  a {
    transition: 0.2s;
    color: inherit;
    text-decoration: none;
    font-size: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
  }
  a:visited {
    color: inherit;
    text-decoration: none;
  }
  a:hover {
    color: inherit;
    background-color: transparent;
    text-decoration: none;
  }
  &:hover {
    color: ${props => props.color};
    background-color: white;
  }
`
