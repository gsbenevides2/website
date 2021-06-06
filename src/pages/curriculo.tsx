import React from 'react'

import { NextSeo } from 'next-seo'
import Link from 'next/link'

import curriculo from '../assets/curriculo.json'
import { ArrowUpSvg } from '../components/curriculo/ArrowUpSvg'
import { ChevronLeftSvg } from '../components/curriculo/ChevronLeftSvg'
import { ChevronRightSvg } from '../components/curriculo/ChevronRightSvg'
import { Container } from '../styles/commons/GradientContainer'
import * as Styled from '../styles/pages/Curriculo'

const CurriculoPage: React.FC = () => {
  const [page, setPage] = React.useState('home')
  const [course, setCourse] = React.useState(-1)
  const [workshop, setWorkshop] = React.useState(-1)
  const [language, setLanguage] = React.useState(-1)
  const [touchStart, setTouchStart] = React.useState<number>()
  const [touchEvent, setTouchEvent] = React.useState<0 | 1>()

  function setDocumentHeightCssVariable() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  const callbackToOnResizeWindow = React.useCallback(() => {
    setDocumentHeightCssVariable()
    scrollTo(page)
  }, [page])

  const scrollTo = React.useCallback((pageTo: string) => {
    document.getElementById(pageTo).scrollIntoView({
      behavior: 'smooth'
    })
    setPage(pageTo)
  }, [])

  const nextCourse = React.useCallback(() => {
    if (course + 1 !== curriculo.courses.length - 1) {
      document.documentElement.style.setProperty(
        '--selected-course',
        (course + 1).toString()
      )
      setCourse(course + 1)
    }
  }, [course])
  const prevCourse = React.useCallback(() => {
    if (course - 1 >= -1) {
      document.documentElement.style.setProperty(
        '--selected-course',
        (course - 1).toString()
      )
      setCourse(course - 1)
    }
  }, [course])

  const nextWorkshop = React.useCallback(() => {
    if (workshop + 1 !== curriculo.workshops.length - 1) {
      document.documentElement.style.setProperty(
        '--selected-workshop',
        (workshop + 1).toString()
      )
      setWorkshop(workshop + 1)
    }
  }, [workshop])
  const prevWorkshop = React.useCallback(() => {
    if (workshop - 1 >= -1) {
      document.documentElement.style.setProperty(
        '--selected-workshop',
        (workshop - 1).toString()
      )
      setWorkshop(workshop - 1)
    }
  }, [workshop])

  const nextLanguage = React.useCallback(() => {
    if (language + 1 !== curriculo.languages.length - 1) {
      document.documentElement.style.setProperty(
        '--selected-language',
        (language + 1).toString()
      )
      setLanguage(language + 1)
    }
  }, [language])
  const prevLanguage = React.useCallback(() => {
    if (language - 1 >= -1) {
      document.documentElement.style.setProperty(
        '--selected-language',
        (language - 1).toString()
      )
      setLanguage(language - 1)
    }
  }, [language])

  const handleTouchEvent = React.useCallback(
    (
      page: 'Course' | 'Workshop' | 'Language',
      e: React.TouchEvent<HTMLLIElement>
    ) => {
      console.log(e)
      if (e.type === 'touchstart') {
        const x = e.touches[0].screenX
        setTouchStart(x)
      } else if (e.type === 'touchmove') {
        const x = e.touches[0].screenX
        setTouchEvent(touchStart - x >= 0 ? 1 : 0)
      } else if (e.type === 'touchend') {
        if (page === 'Language') {
          touchEvent ? nextLanguage() : prevLanguage()
        } else if (page === 'Workshop') {
          touchEvent ? nextWorkshop() : prevWorkshop()
        } else if (page === 'Course') {
          touchEvent ? nextCourse() : prevCourse()
        }
      }
    },
    [touchStart, touchEvent]
  )

  React.useEffect(() => {
    function disableScroll() {
      document.body.style.overflow = 'hidden'
    }
    function setIntialCourseWorkshopAndLanguage() {
      document.documentElement.style.setProperty(
        '--selected-course',
        course.toString()
      )
      document.documentElement.style.setProperty(
        '--selected-workshop',
        workshop.toString()
      )
      document.documentElement.style.setProperty(
        '--selected-language',
        language.toString()
      )
    }
    setIntialCourseWorkshopAndLanguage()
    setDocumentHeightCssVariable()
    disableScroll()
    window.addEventListener('resize', callbackToOnResizeWindow)
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('resize', callbackToOnResizeWindow)
    }
  })

  return (
    <Container>
      <NextSeo
        title="Currículo"
        description="Currículo de Guilherme da Silva Benevides."
        openGraph={{
          site_name: 'Site do Guilherme',
          title: 'Currículo',
          description: 'Currículo de Guilherme da Silva Benevides.',
          type: 'profile',
          locale: 'pt_BR',
          profile: {
            gender: 'male',
            firstName: 'Guilherme',
            lastName: 'Benevides',
            username: 'gsbenevides2'
          },
          images: [
            {
              url: '/curriculum.png',
              alt:
                'Minha foto de perfil no fundo preto ao lado escrito em branco: Currículo.',
              width: 500,
              height: 334
            }
          ],
          url: 'https://gui.dev.br/curriculo'
        }}
        twitter={{
          site: '@gsbenevides2',
          cardType: 'summary_large_image'
        }}
      />
      <Styled.FirstPage id="home">
        <p>
          Olá, sou Guilherme e nessa página você ira encontrar mais informações
          sobre minha experiência profissional com a área de desenvolvimento de
          sistemas. Mas deixa eu contar um pouco mais:
          <br />
          Comecei a programar com 15 anos, na época meu objetivo era criar um
          app que fizesse algo que nenhum outro fazia na Google Play. Nisso
          comecei com Python no app QPython, criei coisas interessantes como um
          conversor de temperatura que usava a biblioteca Android Helper. Porém
          pela falta de computador, não consegui ir mais à frente, porém conheci
          outro app DroidScript, nele vi bastante da Javascript, um pouco de
          HTML e CSS. Fiz um app legal que puxava informações do modem da Vivo.
          Pena que nessa época não conhecia o Git.
          <br />
          Para finalizar conheci o desenvolvimento web, crie sites e
          WebApps(PWAs), mais tarde conheci o Node e com a Rocketseat conheci
          React, React Native e me aprofundei em NodeJS.
          <br />
        </p>
        <div>
          <h2>Saiba mais sobre mim:</h2>
          <ul>
            <li onClick={() => scrollTo('course_page')}>Cursos</li>
            <li onClick={() => scrollTo('workshops_page')}>
              Treinamentos e Workshops
            </li>
            <li onClick={() => scrollTo('languages_page')}>
              Linguagens de Programaçāo
            </li>
            <li>
              <Link href="/">Voltar para Página Inicial</Link>
            </li>
          </ul>
        </div>
      </Styled.FirstPage>
      <Styled.ListPage
        id="course_page"
        length={curriculo.courses.length}
        name="course"
      >
        <div className="top">
          <h2>Cursos</h2>
          <button onClick={() => scrollTo('home')}>
            <ArrowUpSvg />
          </button>
        </div>
        <ul>
          {curriculo.courses.map((course, index) => (
            <li
              key={index.toString()}
              onTouchStart={e => handleTouchEvent('Course', e)}
              onTouchMove={e => handleTouchEvent('Course', e)}
              onTouchEnd={e => handleTouchEvent('Course', e)}
            >
              <h3>{course.name}</h3>
              <p>
                {Object.keys(course.labels).map(label => (
                  <span key={label}>
                    <strong>{label}: </strong>
                    {course.labels[label]}
                    <br />
                  </span>
                ))}
              </p>
              <p>{course.text}</p>
              {course.links
                ? Object.keys(course.links).map(link => (
                  <a key={link} href={course.links[link]}>
                    {link}
                  </a>
                ))
                : undefined}
            </li>
          ))}
        </ul>
        <div className="slider">
          <button aria-label="Curso Anterior" onClick={prevCourse}>
            <ChevronLeftSvg />
          </button>
          <button aria-label="Proximo Curso" onClick={nextCourse}>
            <ChevronRightSvg />
          </button>
        </div>
      </Styled.ListPage>
      <Styled.ListPage
        id="workshops_page"
        length={curriculo.workshops.length}
        name="workshop"
      >
        <div className="top">
          <h2>Treinamentos e Workshops</h2>
          <button aria-label="Voltar a lista" onClick={() => scrollTo('home')}>
            <ArrowUpSvg />
          </button>
        </div>
        <ul>
          {curriculo.workshops.map((workshop, index) => (
            <li
              key={index.toString()}
              onTouchStart={e => handleTouchEvent('Workshop', e)}
              onTouchMove={e => handleTouchEvent('Workshop', e)}
              onTouchEnd={e => handleTouchEvent('Workshop', e)}
            >
              <h3>{workshop.name}</h3>
              <p>
                {Object.keys(workshop.labels).map(label => (
                  <span key={label}>
                    <strong>{label}: </strong>
                    {workshop.labels[label]}
                    <br />
                  </span>
                ))}
              </p>
              <p>{workshop.text}</p>
              {workshop.links
                ? Object.keys(workshop.links).map(link => (
                  <a key={link} href={workshop.links[link]}>
                    {link}
                  </a>
                ))
                : undefined}
            </li>
          ))}
        </ul>
        <div className="slider">
          <button aria-label="Workshop Anterior" onClick={prevWorkshop}>
            <ChevronLeftSvg />
          </button>
          <button aria-label="Próximo Workshop" onClick={nextWorkshop}>
            <ChevronRightSvg />
          </button>
        </div>
      </Styled.ListPage>
      <Styled.ListPage
        name="language"
        id="languages_page"
        length={curriculo.languages.length}
      >
        <div className="top">
          <h2>Linguagens de Programaçāo</h2>
          <button aria-label="Voltar a lista" onClick={() => scrollTo('home')}>
            <ArrowUpSvg />
          </button>
        </div>
        <ul>
          {curriculo.languages.map((language, index) => (
            <li
              key={index.toString()}
              onTouchStart={e => handleTouchEvent('Language', e)}
              onTouchMove={e => handleTouchEvent('Language', e)}
              onTouchEnd={e => handleTouchEvent('Language', e)}
            >
              <h3>{language.name}</h3>
              <p>
                <span>
                  <strong>Quanto eu sei: </strong>
                  {language.porcentage}%
                  <br />
                </span>
              </p>
              <p>{language.text}</p>
            </li>
          ))}
        </ul>
        <div aria-label="Linguagem Anterior" className="slider">
          <button onClick={prevLanguage}>
            <ChevronLeftSvg />
          </button>
          <button aria-label="Próxima Linguagem" onClick={nextLanguage}>
            <ChevronRightSvg />
          </button>
        </div>
      </Styled.ListPage>
    </Container>
  )
}
export default CurriculoPage
