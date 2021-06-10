import React from 'react'

import { ErrorPage } from '../components/ErrorPage'

const Page: React.FC = () => {
  return (
    <ErrorPage
      options={{
        header: {
          title: 'Sem internet',
          description: 'Ops parece que voçê está sem internet.',
          url: '/404.png',
          alt:
            'A minha foto de perfil no fundo preto ao lado em branco escrito: Página Não Encontrada.'
        },
        page: {
          h1: 'Sem internet!',
          p: 'Ops parece que voçê está sem internet.'
        }
      }}
    />
  )
}
export default Page
