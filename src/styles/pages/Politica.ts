import styled from 'styled-components'

export const Container = styled.div`
  padding: 12px;
  width: 100%;
  max-width: 600px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  overflow-y: scroll;
  h1 {
    text-align: center;
  }
  h1,
  h2,
  h3,
  h4 {
    margin-top: 12px;
    margin-bottom: 6px;
  }
  p,
  li {
    text-align: justify;
  }
  .summary li {
    text-decoration: underline;
  }
  ul,
  ol {
    margin: 12px 22px;
  }
  a {
    color: white;
  }
  button {
    cursor: pointer;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    padding: 10px 15px;
    color: white;
    font-size: 19px;
    margin-top: 1rem;
    border-radius: 15px;
    outline: none;
    width: 80%;
    transition: 0.2s;
    background-color: grey;
    border: 1.5px solid grey;
    text-transform: uppercase;
  }

  button:focus {
    border-style: dashed;
    background-color: white;
    color: black;
    border-color: black;
  }
`
