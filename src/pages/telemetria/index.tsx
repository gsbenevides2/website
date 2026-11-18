import { DefaultSeo } from "@/components/DefaultSeo";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { telemetryTargets } from "@/utils/telemetry";
import Link from "next/link";
import { CSSProperties } from "react";
import styles from "./styles.module.scss";

// Atraso da animação de entrada de cada bloco (mesmo efeito de fade do resto do site).
const delay = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

type Item = { title: string; body: string };

const collected: Item[] = [
  {
    title: "Páginas e cliques",
    body: "Qual página você abriu, de onde veio e quais links internos e externos clicou. Esses eventos nascem no dataLayer do Google Tag Manager (nav_click, outbound_click) e são espelhados no OpenObserve.",
  },
  {
    title: "Gravação de sessão",
    body: "Reconstrução visual da navegação (rolagem, cliques e movimentos) para reproduzir problemas de layout e usabilidade. Campos de formulário e senhas são mascarados.",
  },
  {
    title: "Desempenho e erros",
    body: "Tempo de carregamento, recursos baixados, tarefas longas, erros de JavaScript no navegador e erros do servidor, com a pilha de chamadas. Inclui as métricas do Vercel Analytics e do Vercel Speed Insights.",
  },
  {
    title: "Sessão anônima",
    body: "Um identificador aleatório guardado no seu navegador para agrupar os eventos da mesma visita. Ele não contém seu nome nem seu e-mail.",
  },
  {
    title: "IP e localização aproximada",
    body: "O endereço IP de origem e, a partir dele, país, região, cidade, fuso horário e coordenadas aproximadas, lidos na rota /geo (headers do Cloudflare e da Vercel). É usado para separar acessos humanos de robôs e entender de onde vem o público.",
  },
  {
    title: "Origem da visita",
    body: "Parâmetros de campanha (utm_source, utm_medium, utm_campaign), domínio do site que enviou você e a primeira página acessada. Ficam apenas na memória da aba.",
  },
  {
    title: "Google Tag Manager e GA4",
    body: "O contêiner GTM-NW5NDZP2 envia visualizações e eventos personalizados (cliques internos e externos) ao Google Analytics 4; o SDK do Firebase Analytics pode repetir os mesmos eventos quando há Measurement ID. O Google atua como terceiro e usa cookies próprios.",
  },
  {
    title: "Logs do servidor",
    body: "Requisições, tempos de resposta, falhas e versão do serviço, exportados em OTLP pelo OpenTelemetry da Vercel para o OpenObserve, com o mesmo IP e localização usados no navegador.",
  },
];

const storage: [string, string, string][] = [
  ["Sessão do RUM", "localStorage (OpenObserve RUM)", "Expira por inatividade; não é cookie."],
  ["Origem da visita", "sessionStorage (web_acq)", "Some quando você fecha a aba."],
  ["Aviso de telemetria", "localStorage (web_telemetry_notice)", "Guarda que você já viu este aviso."],
  ["Google Analytics", "Cookies _ga / _ga_*", "Definidos pelo Google quando o GA está ativo."],
  ["Firebase Analytics", "Cookies e IndexedDB do SDK", "Somente quando há Measurement ID configurado."],
];

export default function Telemetria() {
  const targets = telemetryTargets();

  return (
    <div className={styles.container}>
      <DefaultSeo
        title="Telemetria"
        description="Quais dados o site do Guilherme coleta, para quê, onde ficam e como desativar."
        image={getOpenMediaImageForNextSeo("Telemetria")}
        site_name="Site do Guilherme"
        type="website"
        canonical={process.env.NEXT_PUBLIC_DOMAIN + "/telemetria"}
        keywords={[
          "guilherme benevides",
          "telemetria",
          "privacidade",
          "openobserve",
        ]}
      />
      <div className={styles.content}>
        <nav aria-label="Você está aqui" className={styles.breadcrumb}>
          <Link href="/">Início</Link>
          <span aria-hidden>/</span>
          <span>Telemetria</span>
        </nav>

        <header className={styles.hero}>
          <p style={delay(100)} className={styles.kicker}>
            Transparência
          </p>
          <h1 style={delay(160)} className={styles.title}>
            Telemetria
          </h1>
          <p style={delay(240)} className={styles.lead}>
            Este é meu site pessoal, sem fins comerciais. Para saber quais
            páginas funcionam, quais links são usados e quais erros precisam de
            conserto, o site coleta dados de navegação — inclusive uma gravação
            anônima da sessão.
          </p>
          <p style={delay(320)} className={styles.note}>
            Não há cadastro de visitantes, não vendo dados e não uso os
            registros para publicidade.
          </p>
          <nav
            aria-label="Atalhos"
            style={delay(400)}
            className={styles.shortcuts}
          >
            <a href="#coletamos">O que coletamos</a>
            <a href="#motivo">Para que serve</a>
            <a href="#desativar">Como desativar</a>
          </nav>
          <p className={styles.updated}>Atualizado em novembro de 2026.</p>
        </header>

        <section id="coletamos" aria-labelledby="coletamos-t">
          <h2 id="coletamos-t">O que é coletado</h2>
          <p className={styles.sectionLead}>
            Os registros são técnicos e ligados a uma sessão anônima. Nenhum
            deles identifica você pelo nome.
            {!targets.rum && (
              <span className={styles.offline}>
                {" "}
                Neste ambiente o RUM do OpenObserve está desligado (sem token
                público no build), então a gravação de sessão não acontece.
              </span>
            )}
          </p>
          <ul className={styles.cards}>
            {collected.map((item, index) => (
              <li key={item.title} style={delay(80 * index)}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="motivo" aria-labelledby="motivo-t">
          <h2 id="motivo-t">Para que serve</h2>
          <div className={styles.prose}>
            <p>
              Entender quais páginas, posts do blog, projetos e certificações
              são mais procurados, de onde vêm os visitantes e onde a navegação
              trava — no celular ou no desktop. A gravação de sessão existe para
              reproduzir um bug exatamente como ele apareceu, sem precisar pedir
              prints ou dados pessoais a quem visitou.
            </p>
            <p>
              Os dados também alimentam o acompanhamento de erros do servidor e
              das rotas da API, para que uma falha seja corrigida antes de
              afetar mais gente.
            </p>
          </div>
        </section>

        <section aria-labelledby="fora-t">
          <h2 id="fora-t">O que fica de fora</h2>
          <ul className={styles.excluded}>
            <li>
              Conteúdo digitado em formulários de busca, de login e no editor do
              blog é mascarado na gravação de sessão.
            </li>
            <li>
              O site não pede nome, e-mail, telefone ou documento para navegar.
              A área administrativa exige login, mas ela não é telemetria.
            </li>
            <li>
              Não há venda, aluguel ou troca de dados com terceiros, nem pixels
              de anúncios.
            </li>
            <li>
              O identificador de sessão é aleatório e fica só no seu navegador;
              ele não é vinculado a uma conta.
            </li>
          </ul>
        </section>

        <section aria-labelledby="onde-t">
          <h2 id="onde-t">Onde os dados ficam</h2>
          <div className={styles.prose}>
            <p>
              Os eventos do navegador vão para uma instância de observabilidade
              (<span className={styles.mono}>OpenObserve</span>) mantida por mim,
              em{" "}
              <span className={styles.mono}>openobserve.infra.gui.dev.br</span>,
              numa organização só deste site. Os traces do servidor são
              exportados pelo OpenTelemetry da Vercel para a mesma instância. O
              Google (via GTM/GA4) e o Vercel Analytics são os únicos destinos
              externos. A retenção segue a configuração dessa instância; as
              sessões do RUM expiram por inatividade.
            </p>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>O quê</th>
                  <th>Onde</th>
                  <th>Duração</th>
                </tr>
              </thead>
              <tbody>
                {storage.map(([what, where, how]) => (
                  <tr key={what}>
                    <td>{what}</td>
                    <td className={styles.mono}>{where}</td>
                    <td>{how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="desativar" aria-labelledby="desativar-t">
          <h2 id="desativar-t">Como desativar</h2>
          <div className={styles.grid}>
            <div className={styles.box}>
              <h3>Bloqueie no navegador</h3>
              <p>
                Extensões como uBlock Origin, Privacy Badger ou a lista de
                privacidade do Brave bloqueiam os envios de telemetria. Você
                também pode bloquear manualmente{" "}
                <span className={styles.mono}>
                  openobserve.infra.gui.dev.br
                </span>
                , <span className={styles.mono}>googletagmanager.com</span>, a
                rota <span className={styles.mono}>/geo</span> e as rotas{" "}
                <span className={styles.mono}>/_vercel/insights</span> e{" "}
                <span className={styles.mono}>/_vercel/speed-insights</span>.
              </p>
            </div>
            <div className={styles.box}>
              <h3>Desligue o JavaScript</h3>
              <p>
                Sem JavaScript o RUM, o GTM e o Vercel Analytics não iniciam. As
                páginas continuam legíveis, mas blog, busca e formulários
                deixam de funcionar.
              </p>
            </div>
            <div className={styles.box}>
              <h3>Não enviamos DNT</h3>
              <p>
                O cabeçalho <span className={styles.mono}>Do Not Track</span>{" "}
                não é interpretado pelo site; use o bloqueio por extensão para
                garantir a interrupção.
              </p>
            </div>
            <div className={styles.box}>
              <h3>Limpe o armazenamento</h3>
              <p>
                Apagar os dados do site remove o identificador de sessão, a
                origem guardada e o registro de que você já viu o aviso. Uma
                nova sessão anônima será criada se a telemetria continuar ativa.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="direitos-t" className={styles.rights}>
          <h2 id="direitos-t">Seus direitos</h2>
          <p className={styles.prose}>
            Como os registros são anônimos, não é possível localizar um
            visitante específico pelo nome. Ainda assim, você pode pedir
            esclarecimentos sobre o tratamento de dados, a remoção de uma sessão
            ou relatar um problema no{" "}
            <a
              href="https://github.com/gsbenevides2/website/issues"
              target="_blank"
              rel="noreferrer"
            >
              repositório do projeto
            </a>{" "}
            ou pelos contatos da página{" "}
            <Link href="/contacts">Contatos</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
