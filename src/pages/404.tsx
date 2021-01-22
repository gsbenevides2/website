import React from 'react'
import { Container, Code } from '../styles/pages/404'
import Link from 'next/link'
import Head from 'next/head'

const Page: React.FC = () => {
  const playMusic = React.useCallback(() => {
    document.getElementsByTagName('audio')[0].play()
  }, [])
  function setDocumentHeightCssVariable() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  React.useEffect(() => {
    function disableScroll() {
      document.body.style.overflow = 'hidden'
    }
    setDocumentHeightCssVariable()
    disableScroll()
    window.addEventListener('resize', setDocumentHeightCssVariable)
  })
  return (
    <Container>
      <Head>
        <title>Página Não Encontrada</title>
      </Head>
      <Code>
        <span>4</span>
        <span onClick={playMusic}>0</span>
        <span>4</span>
      </Code>
      <h1>Ops, a página que você procura não está aqui</h1>
      <h2>Tente umas das opções abaixo:</h2>
      <ul>
        <li>Verique a url, ela pode estar incorreta.</li>
        <li>
          Vá <Link href="/">página inicial.</Link>
        </li>
        <li>
          Pode ser o que você esteja procurando, tenha sido removido, qualquer
          duvida entre em contato com{' '}
          <a href="mailto:gsbenevides2@gmail.com">o administrador.</a>
        </li>
      </ul>
      <audio>
        <source src="../404.mp3" type="audio/mpeg" />
      </audio>
    </Container>
  )
}
export default Page
