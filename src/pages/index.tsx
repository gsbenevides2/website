import React from 'react'
import Head from 'next/head'
import {
  FiArrowUp,
  FiFacebook,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiFileText
} from 'react-icons/fi'

import {
  Container,
  FirstPage,
  SeccoundPage,
  Page,
  SocialTable,
  SocialItem,
  ButtonArea
} from '../styles/pages/Home'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async () => {
  function calculateAge() {
    const birth = new Date(2003, 4, 30)
    const now = new Date()
    let age = now.getFullYear() - birth.getFullYear()

    if (
      (birth.getMonth() === now.getMonth() &&
        birth.getDay() !== now.getDay()) ||
      birth.getMonth() > now.getMonth()
    ) {
      age--
    }
    return age
  }
  return {
    props: {
      age: calculateAge()
    },
    revalidate: 2629746
  }
}

const Home: React.FC<InferGetStaticPropsType<
  typeof getStaticProps
>> = props => {
  const [page, setPage] = React.useState(1)
  function setDocumentHeightCssVariable() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  const scrollTo = React.useCallback((pageTo: number) => {
    document.getElementById(`page_${pageTo}`).scrollIntoView({
      behavior: 'smooth'
    })
    setPage(pageTo)
  }, [])
  const callbackToOnResizeWindow = React.useCallback(() => {
    setDocumentHeightCssVariable()
    scrollTo(page)
  }, [page])
  React.useEffect(() => {
    function disableScroll() {
      document.body.style.overflow = 'hidden'
    }
    setDocumentHeightCssVariable()
    disableScroll()
    window.addEventListener('resize', callbackToOnResizeWindow)
  })
  const socialMedias = [
    {
      name: 'Github',
      url: 'https://github.com/gsbenevides2',
      color: '#24292e',
      icon: FiGithub
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/gsbenevides2',
      color: '#dd2a7b',
      icon: FiInstagram
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/gsbenevides2',
      color: '#0e76a8',
      icon: FiLinkedin
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/Gsbenevides2',
      color: '#3b5998',
      icon: FiFacebook
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/gsbenevides2',
      color: '#1da1f2',
      icon: FiTwitter
    }
  ]
  const myPages = [
    {
      name: 'Currículo',
      url: '/curriculo',
      color: '#24292e',
      icon: FiFileText
    }
  ]
  return (
    <Container>
      <Head>
        <title>Página Inicial</title>
      </Head>
      <FirstPage id="page_1">
        <img
          src="https://avatars0.githubusercontent.com/u/45762112?s=460&u=94ef867a7a94c17a8205b3cf5fe6cd0384dd7c36&v=4"
          alt="Rosto de Guilherme"
        />
        <h1>Olá seja bem-vindo</h1>
        <h2>Meu nome é Guilherme deseja me conhecer melhor?</h2>
        <button onClick={() => scrollTo(2)}>Sim</button>
      </FirstPage>
      <SeccoundPage id="page_2">
        <ButtonArea>
          <button onClick={() => scrollTo(1)}>
            <FiArrowUp />
          </button>
        </ButtonArea>
        <p>
          Oi! Meu nome é Guilherme da Silva Benevides, e sou apaixonado por
          programação, tenho {` ${props.age} `} anos, e desde os meus 15 escrevo
          códigos. Programo muito no meu celular, por falta de computador, porém
          isso não me impede de eu continuar, traz limitações, entretanto
          continuo aprendendo. Comecei com python, minha vontade era criar um
          app, porém com as limitações, migrei para o Javascript e através do
          app DroidScript criei meus primeiros apps. Hoje sei Node.js, React e
          React Native (Expo). Fiz um curso de Assistente de Desenvolvimento de
          Sistemas do Novotec, nele vi tecnologias como banco de dados SQL e o
          básico de Java. Se você deseja me conhecer melhor e ver o que faço
          atualmente acesse minhas redes sociais.
        </p>
        <button onClick={() => scrollTo(3)}>Veja minhas redes sociais</button>
      </SeccoundPage>
      <Page id="page_3">
        <ButtonArea>
          <button onClick={() => scrollTo(2)}>
            <FiArrowUp />
          </button>
        </ButtonArea>
        <SocialTable>
          {socialMedias.map((media, index) => (
            <SocialItem color={media.color} key={index.toString()}>
              <a target="_blank" rel="noreferrer" href={media.url}>
                {React.createElement(media.icon, { size: 60 }, null)}
                <span>{media.name}</span>
              </a>
            </SocialItem>
          ))}
          {myPages.map((page, index) => (
            <SocialItem color={page.color} key={index.toString()}>
              <Link href="curriculo">
                <a>
                  {React.createElement(page.icon, { size: 60 }, null)}
                  <span>{page.name}</span>
                </a>
              </Link>
            </SocialItem>
          ))}
        </SocialTable>
      </Page>
    </Container>
  )
}

export default Home
