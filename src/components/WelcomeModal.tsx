import React from 'react'

import styled from 'styled-components'

import WelcomeBlog from '../assets/welcome_blog.png'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  visibility: hidden;
  transition: visibility 0s, opacity 0.5s linear;
  opacity: 0;
  .content {
    width: 80%;
    background-color: #121212;
    padding: 12px;
    border-radius: 28px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 80%;
    }
    p {
      text-align: justify;
    }
    button {
      cursor: pointer;
      border: 1.5px solid grey;
      padding: 10px 15px;
      background-color: grey;
      color: white;
      font-size: 19px;
      margin-top: 1rem;
      border-radius: 20px;
      outline: none;
      transition: 0.2s;
    }
    button:focus {
      border-style: dashed;
      background-color: white;
      color: black;
      border-color: black;
    }
  }
  &.show {
    visibility: visible;
    opacity: 1;
  }
`

export const WelcomeModal: React.FC = () => {
  const container = React.useRef<HTMLDivElement>(null)
  const close = React.useCallback(() => {
    container.current.classList.remove('show')
  }, [container])
  React.useEffect(() => {
    const firstAccess = localStorage.getItem('firstAccess')
    if (!firstAccess) {
      container.current.classList.add('show')
      localStorage.setItem('firstAccess', Date.now().toString())
    }
  }, [])
  return (
    <Container ref={container}>
      <div className="content">
        <img src={WelcomeBlog} />
        <p>
          Fala dev! Meu nome é Guilherme e é um prazer imenso ter você aqui
          comigo, seja muito bem vindo ao meu blog. Nesse espaço publicarei
          conteúdo sobre minha vida, programação e tudo que eu achar relevante
          vai estar aqui. Desejo uma otima leitura.
        </p>
        <button onClick={close}>Let's go</button>
      </div>
    </Container>
  )
}
