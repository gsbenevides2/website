import React from 'react'

import NextImage from 'next/image'
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
  z-index: 1;
  .content {
    max-width: 320px;
    width: 80%;
    background-color: ${props => props.theme.colors.background};
    padding: 12px;
    border-radius: ${props => props.theme.sizes.borderRadius};
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
    }
    p {
      text-align: justify;
      a {
        color: ${props => props.theme.colors.white};
        &:hover {
          color: ${props => props.theme.colors.white};
        }
      }
    }
    button {
      cursor: pointer;
      padding: 10px 15px;
      color: ${props => props.theme.colors.white};
      font-size: 19px;
      margin-top: 1rem;
      border-radius: ${props => props.theme.sizes.borderRadius};
      outline: none;
      transition: 0.2s;
      background-color: ${props => props.theme.colors.seccoundary};
      border: 1.5px solid ${props => props.theme.colors.seccoundary};
    }
    button:focus {
      border-style: dashed;
      color: ${props => props.theme.colors.white};
      background-color: ${props => props.theme.colors.accent};
      border-color: ${props => props.theme.colors.accent};
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
    setTimeout(() => {
      container.current.classList.remove('show')
    }, 2000)
  }, [container])
  React.useEffect(() => {
    const firstAccess = localStorage.getItem('firstAccess_v2')
    if (!firstAccess) {
      container.current.classList.add('show')
      localStorage.setItem('firstAccess_v2', Date.now().toString())
    }
  }, [])
  return (
    <Container ref={container}>
      <div className="content">
        <NextImage
          alt="Duas pessoas em ilutração"
          width="236"
          height="204"
          src={WelcomeBlog}
        />
        <p>
          Beleza! Meu nome é Guilherme e é um prazer imenso ter você aqui
          comigo, seja muito bem vindo. Nesse espaço publicarei conteúdo sobre
          minha vida, programação e tudo que eu achar relevante vai estar aqui.
          Desejo uma otima leitura. Ao continuar você concorda com os termos{' '}
          <a href="/politica" target="_blank">
            aqui
          </a>
          .
        </p>
        <button onClick={close}>Let&apos;s go</button>
      </div>
    </Container>
  )
}
