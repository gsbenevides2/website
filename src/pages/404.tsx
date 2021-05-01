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
        <title>Página Não Encontrada</title>
      </Head>
      <div className="content">
        <h1>Ops! Não encontrei o que procuras 😔</h1>
        <h2>Tente umas das opções abaixo:</h2>
        <ul>
          <li>Verique a url(link), ela pode estar incorreta.</li>
          <li>
            Vá <Link href="/">página inicial</Link>. E procure por lá.
          </li>
          <li>
            Pode ser o que você esteja procurando, tenha sido removido, qualquer
            duvida entre em contato com{' '}
            <a href="mailto:gsbenevides2@gmail.com">o administrador.</a>
          </li>
          <li>Ou você procura outra coisa...</li>
        </ul>
        <h5 onClick={playMusic}>Código do Erro:404</h5>
      </div>
      <audio>
        <source src="/404.mp3" type="audio/mpeg" />
      </audio>
    </Container>
  )
}
export default Page
