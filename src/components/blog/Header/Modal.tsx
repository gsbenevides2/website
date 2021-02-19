import React from 'react'
import styled from 'styled-components'
import Notification from '../../../assets/notification.png'
import firebase from '../../../utils/firebase'

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
      border: 1.5px solid transparent;
      padding: 10px 15px;
      background-color: transparent;
      color: white;
      font-size: 19px;
      margin-top: 1rem;
      border-radius: 20px;
      outline: none;
      width: 80%;
      transition: 0.2s;
      &.primary {
        background-color: grey;
        border: 1.5px solid grey;
        text-transform: uppercase;
      }
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

interface Props {
  open: boolean
  close: () => void
}

export const NotificationQuestionModal: React.FC<Props> = ({ open, close }) => {
  const container = React.useRef<HTMLDivElement>(null)
  const [status, setStatus] = React.useState('disabled')
  const enableNotifications = React.useCallback(async () => {
    try {
      const permission = await window.Notification.requestPermission()
      if (permission === 'denied') {
        setStatus('browser-permission-denied')
        return
      }
      const token = await firebase.messaging().getToken()
      await fetch(`/api/fcmToken?token=${token}`, { method: 'POST' })
      localStorage.setItem('fcmToken', token)
      setStatus('actived')
    } catch (e) {
      setStatus('error')
    }
  }, [])
  const disableNotifications = React.useCallback(async () => {
    try {
      const token = await firebase.messaging().getToken()
      await firebase.messaging().deleteToken()
      await fetch(`/api/fcmToken?token=${token}`, { method: 'DELETE' })
      localStorage.removeItem('fcmToken')
      close()
      setStatus('disabled')
    } catch (e) {
      setStatus('error')
    }
  }, [])
  React.useEffect(() => {
    if (open) {
      container.current.classList.add('show')
    } else {
      container.current.classList.remove('show')
    }
  }, [open])
  React.useEffect(() => {
    if (!('Notification' in window)) {
      setStatus('notSupport')
    } else if (window.Notification.permission === 'denied') {
      setStatus('browser-permission-denied')
    } else if (window.Notification.permission === 'granted') {
      ;(async () => {
        try {
          const fcmToken = localStorage.getItem('fcmToken')
          if (fcmToken) {
            const token = await firebase.messaging().getToken()

            if (fcmToken !== token) {
              await fetch(`/api/fcmToken?token=${token}`, { method: 'POST' })
              await fetch(`/api/fcmToken?token=${fcmToken}`, {
                method: 'DELETE'
              })
              localStorage.setItem('fcmToken', fcmToken)
            }
            setStatus('actived')
          }
        } catch (e) {
          setStatus('error')
        }
      })()
    }
  }, [])
  return (
    <Container ref={container}>
      {status === 'disabled' && (
        <div className="content">
          <img src={Notification} />
          <p>
            Olá, você deseja receber notificações em seu navegador quando eu
            publicar uma nova postagem?
          </p>
          <button className="primary" onClick={enableNotifications}>
            Sim
          </button>
          <button onClick={close}>Não</button>
        </div>
      )}
      {status === 'notSupport' && (
        <div className="content ">
          <img src={Notification} />
          <p>Infelizmente seu navegador não tem suporte as notificações</p>
          <button className="primary" onClick={close}>
            OK
          </button>
        </div>
      )}
      {status === 'actived' && (
        <div className="content ">
          <img src={Notification} />
          <p>As notificações estão ativadas</p>
          <button className="primary" onClick={close}>
            OK
          </button>
          <button onClick={disableNotifications}>
            {' '}
            Desativar Notificações
          </button>
        </div>
      )}
      {status === 'error' && (
        <div className="content ">
          <img src={Notification} />
          <p>
            Ocorreu um erro recarregue a pagina e tente novamente mais tarde
          </p>
          <button className="primary" onClick={close}>
            OK
          </button>
        </div>
      )}
      {status === 'browser-permission-denied' && (
        <div className="content ">
          <img src={Notification} />
          <p>
            Ops, você não falou pro seu navegador que eu posso enviar
            notificações vá nas configurações e me permita. Após isso recaregue
            a pagina.
          </p>
          <button className="primary" onClick={close}>
            OK
          </button>
        </div>
      )}
    </Container>
  )
}