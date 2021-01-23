import Link from 'next/link'
import React from 'react'
import { Container, FirstPage, CoursePage } from '../styles/pages/curriculo'
import { FiArrowUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import curriculo from '../assets/curriculo.json'

const CurriculoPage: React.FC = () => {
  const [page, setPage] = React.useState('home')
  const [course, setCourse] = React.useState(-1)
  function setDocumentHeightCssVariable() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
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
  const callbackToOnResizeWindow = React.useCallback(() => {
    setDocumentHeightCssVariable()
    scrollTo(page)
  }, [page])
  React.useEffect(() => {
    function disableScroll() {
      document.body.style.overflow = 'hidden'
    }
    function setIntialCourse() {
      document.documentElement.style.setProperty(
        '--selected-course',
        course.toString()
      )
    }
    setIntialCourse()
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
          <li>Treinamentos e Workshops</li>
          <li>Linguagens de Programaçāo</li>
          <li>Baixar Currículo</li>
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
    </Container>
  )
}
export default CurriculoPage
