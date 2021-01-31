import Link from 'next/link'
import React from 'react'
import {
  Container,
  FirstPage,
  CoursePage,
  WorkshopPage,
  LanguagesPage
} from '../styles/pages/curriculo'
import { FiArrowUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import curriculo from '../assets/curriculo.json'

const CurriculoPage: React.FC = () => {
  const [page, setPage] = React.useState('home')
  const [course, setCourse] = React.useState(-1)
  const [workshop, setWorkshop] = React.useState(-1)
  const [language, setLanguage] = React.useState(-1)

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
  })

  return (
    <Container>
      <FirstPage id="home">
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
      </FirstPage>
      <CoursePage id="course_page" qtdCourses={curriculo.courses.length}>
        <div className="top">
          <h2>Cursos</h2>
          <button onClick={() => scrollTo('home')}>
            <FiArrowUp />
          </button>
        </div>
        <ul>
          {curriculo.courses.map((course, index) => (
            <li key={index.toString()}>
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
          <button onClick={prevCourse}>
            <FiChevronLeft />
          </button>
          <button onClick={nextCourse}>
            <FiChevronRight />
          </button>
        </div>
      </CoursePage>
      <WorkshopPage
        id="workshops_page"
        qtdWorkshops={curriculo.workshops.length}
      >
        <div className="top">
          <h2>Treinamentos e Workshops</h2>
          <button onClick={() => scrollTo('home')}>
            <FiArrowUp />
          </button>
        </div>
        <ul>
          {curriculo.workshops.map((workshop, index) => (
            <li key={index.toString()}>
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
          <button onClick={prevWorkshop}>
            <FiChevronLeft />
          </button>
          <button onClick={nextWorkshop}>
            <FiChevronRight />
          </button>
        </div>
      </WorkshopPage>
      <LanguagesPage
        id="languages_page"
        qtdLanguages={curriculo.languages.length}
      >
        <div className="top">
          <h2>Linguagens de Programaçāo</h2>
          <button onClick={() => scrollTo('home')}>
            <FiArrowUp />
          </button>
        </div>
        <ul>
          {curriculo.languages.map((language, index) => (
            <li key={index.toString()}>
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
        <div className="slider">
          <button onClick={prevLanguage}>
            <FiChevronLeft />
          </button>
          <button onClick={nextLanguage}>
            <FiChevronRight />
          </button>
        </div>
      </LanguagesPage>
    </Container>
  )
}
export default CurriculoPage
