import React from 'react'

import { ErrorPage } from '../components/ErrorPage'

const Page: React.FC = () => {
  return (
    <ErrorPage
      options={{
        header: {
          title: 'Página Não Encontrada',
          description: 'A página acessada não foi encontrada.',
          url: '/404.png',
          alt:
            'A minha foto de perfil no fundo preto ao lado em branco escrito: Página Não Encontrada.'
        },
        page: {
          h1: 'Ops não encontrei o que procuras!',
          p: 'Talvez o link que você abriu esteja quebrado ou errado.'
        }
      }}
    />
  )
}
export default Page
