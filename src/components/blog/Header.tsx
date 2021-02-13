import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const HeaderStyled = styled.header`
  background-color: #434343;
  margin: 0;
  h1 {
    font-size: 2rem;
    padding: 12px;
    font-weight: 400;
  }
`

const Header: React.FC = () => {
  return (
    <HeaderStyled>
      <Link href="/blog">
        <h1> Blog do Guilherme</h1>
      </Link>
    </HeaderStyled>
  )
}

export default Header
