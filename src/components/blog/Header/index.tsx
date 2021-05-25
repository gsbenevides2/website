import React from 'react'

import Link from 'next/link'
import styled, { keyframes } from 'styled-components'

import { BellSvg } from '../BellSvg'
import { NotificationQuestionModal } from './Modal'
const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 283px;
  }
`

const blinkCaret = keyframes`
  from,to {
    border-color: transparent;
  }
  50% {
    border-color: ${props => props.theme.colors.white};
  }
`
const HeaderStyled = styled.header`
  background-color: ${props => props.theme.colors.primary};
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 2rem;
    margin: 12px;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 400;
    cursor: pointer;
    border-right: 2px solid ${props => props.theme.colors.white};
    animation: ${typing} 3.5s steps(30, end),
      ${blinkCaret} 0.75s step-end infinite;
  }
  button {
    color: white;
    align-items: center;
    background-color: transparent;
    border: none;
    margin-right: 22px;
    padding: 5px;
    border-radius: 50%;
    transition: 0.2s;
    outline: none;
    width: 37px;
    height: 37px;
    font-size: 22px;
    &:focus {
      background-color: ${props => props.theme.colors.white};
      color: ${props => props.theme.colors.black};
      .icon {
        stroke: ${props => props.theme.colors.black};
      }
    }
  }
`

const Header: React.FC = () => {
  const [notificationModalOpen, setNotificationModalOpen] = React.useState(
    false
  )
  const closeNotificationModal = React.useCallback(() => {
    setNotificationModalOpen(false)
  }, [])
  const openNotificationModal = React.useCallback(() => {
    setNotificationModalOpen(true)
  }, [])
  return (
    <React.Fragment>
      <NotificationQuestionModal
        open={notificationModalOpen}
        close={closeNotificationModal}
      />
      <HeaderStyled>
        <Link as="/blog" href="/blog">
          <h1>Blog do Guilherme</h1>
        </Link>
        <button onClick={openNotificationModal}>
          <BellSvg />
        </button>
      </HeaderStyled>
    </React.Fragment>
  )
}

export default Header
