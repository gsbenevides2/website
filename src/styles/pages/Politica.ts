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
    color: ${props => props.theme.colors.white};
  }
  button {
    cursor: pointer;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    padding: 10px 15px;
    color: ${props => props.theme.colors.white};
    font-size: 19px;
    margin-top: 1rem;
    border-radius: ${props => props.theme.sizes.borderRadius};
    outline: none;
    width: 80%;
    transition: 0.2s;
    background-color: ${props => props.theme.colors.primary};
    border: 1.5px solid ${props => props.theme.colors.primary};
    text-transform: uppercase;
  }

  button:focus {
    border-style: dashed;
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    border-color: ${props => props.theme.colors.black};
  }
`
