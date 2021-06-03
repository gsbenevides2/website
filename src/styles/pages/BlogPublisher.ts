import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
`
type StepProps = {
  show?: boolean
}
export const Step = styled.div<StepProps>`
  padding: 12px;
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  h1 {
    text-align: center;
  }
  button {
    cursor: pointer;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    padding: 10px 15px;
    color: ${props => props.theme.colors.white};
    font-size: 17px;
    margin-top: 1rem;
    border-radius: ${props => props.theme.sizes.borderRadius};
    outline: none;
    width: 80%;
    transition: 0.2s;
    background-color: ${props => props.theme.colors.accent};
    border: 1.5px solid ${props => props.theme.colors.accent};
  }

  button:focus {
    border-style: dashed;
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    border-color: ${props => props.theme.colors.black};
  }
  input {
    background-color: ${props => props.theme.colors.seccoundary};
    padding: 10px 15px;
    color: ${props => props.theme.colors.white};
    border-radius: ${props => props.theme.sizes.borderRadius};
    border: 1px solid ${props => props.theme.colors.white};
    margin-top: 0.5rem;
    outline: none;
    -webkit-appearance: none;
    &::placeholder {
      color: #ababab;
    }
  }
  ul {
    margin-left: 12px;
    list-style-position: inside;
    list-style: none;
  }
`
type LogProps = {
  type: 'success' | 'error' | 'info'
}

const logColors = {
  success: '#4C9141',
  error: '#AF2B1E',
  info: 'transparent'
}

const listImages = {
  success: '✓',
  error: 'X',
  info: '•'
}
export const LogLine = styled.li<LogProps>`
  background-color: ${props => logColors[props.type]};
  &:before {
    content: '${props => listImages[props.type]}';
    padding-right: 10px;
  }
`

export const Previsualizer = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colors.background};
  header {
    display: none;
  }
  button.sender {
    cursor: pointer;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    padding: 10px 15px;
    color: ${props => props.theme.colors.white};
    font-size: 17px;
    margin-top: 1rem;
    border-radius: ${props => props.theme.sizes.borderRadius};
    outline: none;
    width: 80%;
    transition: 0.2s;
    background-color: ${props => props.theme.colors.accent};
    border: 1.5px solid ${props => props.theme.colors.accent};
  }
  button.sender:focus {
    border-style: dashed;
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    border-color: ${props => props.theme.colors.black};
  }
`
