import React from 'react'

import { NextSeo } from 'next-seo'
import { io } from 'socket.io-client'

import Header from '../../components/blog/Header'
import * as Styled from '../../styles/pages/BlogPublisher'
import PostPage, { FormatedPost } from './post/[id]'

type Message =
  | {
      type: 'info' | 'success' | 'error'
      text: string
    }
  | {
      type: 'data'
      text: string
      data: FormatedPost
    }

type Log = {
  type: 'info' | 'success' | 'error'
  text: string
}

export default function PublisherPage(): React.ReactElement {
  const [post, setPost] = React.useState<FormatedPost>()
  const [step, setStep] = React.useState(0)
  const [linkOrName, setLinkOrName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [logs, setLogs] = React.useState<Log[]>([])
  const socket = io(
    process.env.PUBLIC_NEXT_ENV === 'production'
      ? 'https://gsbenevides2.herokuapp.com'
      : process.env.BACKEND_URL ||
          'https://gsbenevides2-development.herokuapp.com/'
  )
  const goToSendPostStep = React.useCallback(() => {
    setStep(1)
  }, [])
  const goToUpdatePostStep = React.useCallback(() => {
    setStep(2)
  }, [])
  const goToDeletePostStep = React.useCallback(() => {
    setStep(3)
  }, [])
  const inputLinkOrNameChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLinkOrName(event.target.value)
    },
    []
  )
  const inputPasswordChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
    },
    []
  )
  const goToSelectStep = React.useCallback(() => {
    setStep(0)
  }, [])
  const sendPost = React.useCallback(() => {
    setStep(4)
    socket.on('message', (message: Message) => {
      if (message.type !== 'data') {
        setLogs(logs => {
          return [...logs, message]
        })
      } else {
        setPost(message.data)
      }
    })
    socket.emit('sendPost', {
      notionPageUrl: linkOrName,
      password
    })
  }, [linkOrName, password])
  const updatePost = React.useCallback(() => {
    setStep(4)
    socket.on('message', (message: Message) => {
      if (message.type !== 'data') {
        setLogs(logs => {
          return [...logs, message]
        })
      } else {
        setPost(message.data)
      }
    })
    socket.emit('updatePost', {
      notionPageUrl: linkOrName,
      password
    })
  }, [linkOrName, password])
  const deletePost = React.useCallback(() => {
    setStep(4)
    socket.on('message', (message: Message) => {
      if (message.type !== 'data') {
        setLogs(logs => {
          return [...logs, message]
        })
      }
    })
    socket.emit('deletePost', {
      postName: linkOrName,
      password
    })
  }, [linkOrName, password])
  const finish = React.useCallback(() => {
    setPost(null)
    socket.emit('finish', password)
  }, [password])
  return (
    <>
      <NextSeo title="Blog do Guilherme - Publisher" noindex />
      <Header />
      <Styled.Container>
        <Styled.Step show={step === 0}>
          <h1>Qual operação deseja fazer?</h1>
          <button onClick={goToSendPostStep}>Publicar um novo post.</button>
          <button onClick={goToUpdatePostStep}>
            Atualizar um post já publicado.
          </button>
          <button onClick={goToDeletePostStep}>Deletar post.</button>
        </Styled.Step>
        <Styled.Step show={step === 1}>
          <h1>Publicar Post</h1>
          <input
            onChange={inputLinkOrNameChange}
            autoComplete="off"
            placeholder="Link do Notion"
            type="text"
          />
          <input
            onChange={inputPasswordChange}
            autoComplete="off"
            placeholder="Senha de Segurança"
            type="password"
          />
          <button onClick={sendPost}>Continuar</button>
          <button onClick={goToSelectStep}>Voltar</button>
        </Styled.Step>
        <Styled.Step show={step === 2}>
          <h1>Atualizar Post</h1>
          <input
            onChange={inputLinkOrNameChange}
            autoComplete="off"
            placeholder="Link do Notion"
            type="text"
          />
          <input
            onChange={inputPasswordChange}
            autoComplete="off"
            placeholder="Senha de Segurança"
            type="password"
          />
          <button onClick={updatePost}>Continuar</button>
          <button onClick={goToSelectStep}>Voltar</button>
        </Styled.Step>
        <Styled.Step show={step === 3}>
          <h1>Deletar Post</h1>
          <input
            onChange={inputLinkOrNameChange}
            autoComplete="off"
            placeholder="Nome do Post"
            type="text"
          />
          <input
            onChange={inputPasswordChange}
            autoComplete="off"
            placeholder="Senha de Segurança"
            type="password"
          />
          <button onClick={deletePost}>Continuar</button>
          <button onClick={goToSelectStep}>Voltar</button>
        </Styled.Step>
        <Styled.Step show={step === 4}>
          <h1>
            Operaçāo em Andamento
            <br />
            Aguarde
          </h1>
          <ul>
            {logs.map((log, index) => (
              <Styled.LogLine key={index.toString()} type={log.type}>
                {log.text}
              </Styled.LogLine>
            ))}
          </ul>
        </Styled.Step>
        {post && (
          <Styled.Previsualizer>
            <PostPage post={post} />
            <button className="sender" onClick={finish}>
              Finalizar
            </button>
          </Styled.Previsualizer>
        )}
      </Styled.Container>
    </>
  )
}
