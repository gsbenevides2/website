import React from 'react'

import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

import * as Styled from '../styles/pages/Politica'

const Politica: React.FC = () => {
  const router = useRouter()
  function scrollTo(id: string) {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth'
    })
  }
  return (
    <Styled.Container>
      <NextSeo
        title="Política de Privacidade, Uso de Dados e Termos de Uso"
        description="Política de Privacidade, Uso de Dados e Termos de Uso do Blog e Site do Guilherme."
        openGraph={{
          title: 'Política de Privacidade, Uso de Dados e Termos de Uso',
          description:
            'Política de Privacidade, Uso de Dados e Termos de Uso do Blog e Site do Guilherme.',
          site_name: 'Site e Blog do Guilherme',
          images: [{ url: '/police.png' }],
          type: 'website'
        }}
        twitter={{
          cardType: 'summary_large_image'
        }}
      />
      <h1>Política de Privacidade, Uso de Dados e Termos de Uso</h1>

      <h2>Sumário</h2>
      <ul className="summary">
        <li onClick={() => scrollTo('politica')}>Política de Privacidade</li>
        <li onClick={() => scrollTo('uso')}>Uso de Dados</li>
        <li onClick={() => scrollTo('termos')}>Termos de Serviço</li>
      </ul>

      <h2 id="politica">Política de Privacidade</h2>
      <p>
        A sua privacidade é importante para nós. É política do minha, Guilherme
        da Silva Benevides, proprietário do site e blog em respeitar a sua
        privacidade em relação a qualquer informação sua que possamos coletar no
        site e blog.
      </p>
      <p>
        Solicitamos informações pessoais apenas quando realmente precisamos
        delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais,
        com o seu conhecimento e consentimento. Também informamos por que
        estamos coletando e como será usado.
      </p>
      <p>
        Apenas retemos as informações coletadas pelo tempo necessário para
        fornecer o serviço solicitado. Quando armazenamos dados, protegemos
        dentro de meios comercialmente aceitáveis para evitar perdas e roubos,
        bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
      </p>
      <p>
        Não compartilhamos informações de identificação pessoal publicamente ou
        com terceiros, exceto quando exigido por lei.
      </p>
      <p>
        O nosso site e blog podem ter links para sites externos que não são
        operados por nós. Esteja ciente de que não temos controle sobre o
        conteúdo e práticas desses sites e não podemos aceitar responsabilidade
        por suas respectivas políticas de privacidade.
      </p>
      <p>
        Você é livre para recusar a nossa solicitação de informações pessoais,
        entendendo que talvez não possamos fornecer alguns dos serviços
        desejados.
      </p>
      <p>
        O uso continuado de nosso site e blog será considerado como aceitação de
        nossas práticas em torno de privacidade e informações pessoais. Se você
        tiver alguma dúvida sobre como lidamos com dados do usuário e
        informações pessoais, entre em contato comigo através do e-mail
        gsbenevides2@gmail.com.
      </p>
      <h3>Compromisso do Usuário</h3>
      <p>
        O usuário se compromete a fazer uso adequado dos conteúdos e da
        informações que o site e blog oferecem e com caráter enunciativo, mas
        não limitativo:
      </p>
      <ul>
        <li>
          A) Não se envolver em atividades que sejam ilegais ou contrárias à boa
          fé a à ordem pública;
        </li>
        <li>
          B) Não difundir propaganda ou conteúdo de natureza racista,
          xenofóbica, ou casas de apostas (ex.:
          <a href="https://ondeapostar.pt/review/moosh-portugal/"> Moosh</a>),
          jogos de sorte e azar, qualquer tipo de pornografia ilegal, de
          apologia ao terrorismo ou contra os direitos humanos;
        </li>
        <li>
          C) Não causar danos aos sistemas físicos (hardwares) e lógicos
          (softwares) do site e blog, de seus fornecedores ou terceiros, para
          introduzir ou disseminar vírus informáticos ou quaisquer outros
          sistemas de hardware ou software que sejam capazes de causar danos
          anteriormente mencionados.
        </li>
      </ul>
      <h3>Mais informações</h3>
      <p>
        Esperemos que esteja esclarecido e, como mencionado anteriormente, se
        houver algo que você não tem certeza se precisa ou não, geralmente é
        mais seguro deixar os cookies ativados, caso interaja com um dos
        recursos que você usa em nosso site e blog.
      </p>
      <p>
        Esta política é efetiva a partir de <strong>Maio 2021</strong>,
        <i>Guilherme da Silva Benevides</i>.
      </p>

      <h2 id="uso">Uso de Dados</h2>
      <h3>Quem é o proprietário do site?</h3>
      <p>
        O proprietário do site e blog é Guilherme da Silva Benevides, morador de
        Suzano no estado de São Paulo, desenvolvedor de software, para contato
        pode se utilizar as redes sociais disponíveis na home page do site, ou
        enviar um e-mail para gsbenevides2@gmail.com.
      </p>
      <h3>Quais dados são utilizados?</h3>
      <p>
        O site que você está acessando usa de alguns dados para funcionar, esses
        são:
      </p>
      <ul>
        <li>
          Id de Usuário:
          <p>
            Dado usado pelo servidor para contabilizar as views no blog, ele é
            gerado automaticamente pelo sistema e é salvo no LocalStorage do
            navegador, nomeado como &#x27;useriId&#x27;. Ele é salvo também em
            cada post que você acessa, não é visível para outros usuários.
          </p>
        </li>
        <li>
          Token de Envio de Notificações:
          <p>
            Quando você autoriza o envio de push notifications ao seu navegador,
            o mesmo gera um token, para identificar a quem enviar a notificação,
            ele é gerado pelo Firebase Cloud Messaging e é salvo em seu
            navegador como no LocalStorage, como &#x27;notificationId&#x27;,
            esse é enviado ao servidor para ser recuperado pelo sistema ao
            enviar notificações.
          </p>
        </li>
      </ul>
      <p>
        Reforço que os dados acima não rastreiam o usuário, e são usados somente
        pelo site. Além disso não se captura nome, idade, localização e qualquer
        dado pessoal do usuário.
      </p>
      <h3>Ferramentas usadas no site</h3>
      <ul>
        <li>
          Firebase:
          <p>
            São usados o Cloud Firestore(como banco de dados) e o Cloud
            Storage(Armazenamento de Arquivos), os mesmos estão protegidos pelas
            Regras de Segurança do Firebase.
          </p>
        </li>
        <li>
          Vercel:
          <p>
            A Vercel é utilizada como servidor de hospedagem do site, além disso
            a Vercel Analitics é usado para medir performance e desempenho.
          </p>
        </li>
        <li>
          NextJS:
          <p>Framework de Renderização ao Lado do Servidor para React</p>
        </li>
      </ul>
      <h2 id="termos">Termos de Serviço</h2>
      <h3>1. Termos</h3>
      <p>
        Ao acessar ao este site e blog, concorda em cumprir estes termos de
        serviço, todas as leis e regulamentos aplicáveis e concorda que é
        responsável pelo cumprimento de todas as leis locais aplicáveis. Se você
        não concordar com algum desses termos, está proibido de usar ou acessar
        este site e o blog. Os materiais contidos neste site são protegidos
        pelas leis de direitos autorais e marcas comerciais aplicáveis.
      </p>
      <h3>2. Uso de Licença</h3>
      <p>
        É concedida permissão para baixar temporariamente uma cópia dos
        materiais (informações ou software) no site e blog, apenas para
        visualização transitória pessoal e não comercial. Esta é a concessão de
        uma licença, não uma transferência de título e, sob esta licença, você
        não pode:
      </p>
      <ol>
        <li>modificar ou copiar os materiais;</li>

        <li>
          usar os materiais para qualquer finalidade comercial ou para exibição
          pública (comercial ou não comercial);
        </li>
        <li>
          tentar descompilar ou fazer engenharia reversa de qualquer software
          contido no site e blog;
        </li>
        <li>
          remover quaisquer direitos autorais ou outras notações de propriedade
          dos materiais; ou
        </li>
        <li>
          transferir os materiais para outra pessoa ou &#39;espelhe&#39; os
          materiais em qualquer outro servidor.
        </li>
      </ol>
      <p>
        Esta licença será automaticamente rescindida se você violar alguma
        dessas restrições e poderá ser rescindida pelo proprietário a qualquer
        momento. Ao encerrar a visualização desses materiais ou após o término
        desta licença, você deve apagar todos os materiais baixados em sua
        posse, seja em formato eletrónico ou impresso.
      </p>
      <h3>3. Isenção de responsabilidade</h3>
      <ol>
        <li>
          Os materiais no site e blog são fornecidos &#39;como estão&#39;. o
          proprietário não oferece garantias, expressas ou implícitas, e, por
          este meio, isenta e nega todas as outras garantias, incluindo, sem
          limitação, garantias implícitas ou condições de comercialização,
          adequação a um fim específico ou não violação de propriedade
          intelectual ou outra violação de direitos.{' '}
        </li>
        <li>
          Além disso, o proprietário não garante ou faz qualquer representação
          relativa à precisão, aos resultados prováveis ou à confiabilidade do
          uso dos materiais em seu site ou de outra forma relacionado a esses
          materiais ou em sites vinculados a este site.
        </li>
      </ol>
      <h3>4. Limitações</h3>
      <p>
        Em nenhum caso o proprietário ou seus fornecedores serão responsáveis
        por quaisquer danos (incluindo, sem limitação, danos por perda de dados
        ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da
        incapacidade de usar os materiais no site e no blog, mesmo que o
        proprietário ou um representante autorizado da site ou blog tenha sido
        notificado oralmente ou por escrito da possibilidade de tais danos. Como
        algumas jurisdições não permitem limitações em garantias implícitas, ou
        limitações de responsabilidade por danos conseqüentes ou incidentais,
        essas limitações podem não se aplicar a você.
      </p>
      <h3>5. Precisão dos materiais</h3>
      <p>
        Os materiais exibidos no site e no blog podem incluir erros técnicos,
        tipográficos ou fotográficos. O proprietário não garante que qualquer
        material em seu site e no blog seja preciso, completo ou atual. o
        proprietário pode fazer alterações nos materiais contidos em seu site e
        no blog a qualquer momento, sem aviso prévio. No entanto, o proprietário
        não se compromete a atualizar os materiais.
      </p>
      <h3>6. Links</h3>
      <p>
        O proprietário não analisou todos os sites vinculados ao seu site e no
        blog, e também não é responsável pelo conteúdo de nenhum site vinculado.
        A inclusão de qualquer link não implica endosso por do proprietário do
        site e do blog. O uso de qualquer site vinculado é por conta e risco do
        usuário.
      </p>
      <h4>Modificações</h4>
      <p>
        O proprietário pode revisar estes termos de serviço do site e do blog a
        qualquer momento, sem aviso prévio. Ao usar este site, você concorda em
        ficar vinculado à versão atual desses termos de serviço.
      </p>
      <h4>Lei aplicável</h4>
      <p>
        Estes termos e condições são regidos e interpretados de acordo com as
        leis do site e do blog e você se submete irrevogavelmente à jurisdição
        exclusiva dos tribunais naquele estado ou localidade.
      </p>
      <button onClick={router.back}>Voltar</button>
    </Styled.Container>
  )
}
export default Politica
