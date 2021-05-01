import React from 'react'

import Head from 'next/head'
import Link from 'next/link'

import { Container, Code } from '../styles/pages/404'

const Page: React.FC = () => {
  const playMusic = React.useCallback(() => {
    document.getElementsByTagName('audio')[0].play()
  }, [])
  function setDocumentHeightCssVariable() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  React.useEffect(() => {
    setDocumentHeightCssVariable()
    window.addEventListener('resize', setDocumentHeightCssVariable)
  })
  return (
    <Container>
      <Head>
        <title>Erro Interno no Servidor</title>
      </Head>
      <div className="content">
        <h1>Morriii ☠️⚰️</h1>
        <h2>
          Infelizmente faleci ao tentar processar sua solicitaçāo. Tente
          novamente mais tarde.
        </h2>
        <p>
          Caso o erro persista, entre em contato com o{' '}
          <a href="mailto:gsbenevides2@gmail.com">o administrador.</a>
        </p>
        <h5 onClick={playMusic}>Código do Erro:500</h5>
      </div>
      <audio>
        <source src="/404.mp3" type="audio/mpeg" />
      </audio>
    </Container>
  )
}
export default Page
