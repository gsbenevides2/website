import React from 'react'
import { FiBell } from 'react-icons/fi'

import Link from 'next/link'
import styled from 'styled-components'

import { NotificationQuestionModal } from './Modal'
const HeaderStyled = styled.header`
  background-color: #434343;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 2rem;
    padding: 12px;
    font-weight: 400;
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
    &:focus {
      background-color: white;
      color: black;
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
        <Link href="/blog">
          <h1> Blog do Guilherme</h1>
        </Link>
        <button onClick={openNotificationModal}>
          <FiBell size={22} />
        </button>
      </HeaderStyled>
    </React.Fragment>
  )
}

export default Header
