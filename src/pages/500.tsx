import React from 'react'

import { ErrorPage } from '../components/ErrorPage'

const Page: React.FC = () => {
  return (
    <ErrorPage
      options={{
        header: {
          title: 'Erro Interno do Servidor',
          description: 'Aconteceu um erro ao processar sua requisição.',
          url: '/500.png',
          alt:
            'A minha foto de perfil no fundo preto ao lado um texto em branco escrito: Erro Interno do Servidor.'
        },
        page: {
          h1: 'Ops, algo de errado aconteceu!',
          p:
            'Algo estava fora dos planos. E aconteceu um erro no sistema. Reporte o erro para o Gui.'
        }
      }}
    />
  )
}
export default Page
