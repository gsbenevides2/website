import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { TbCertificate, TbApps, TbUserCircle, TbPencil } from "react-icons/tb";
import { MouseEvent, useCallback, useRef } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import moment from "moment";
import { DefaultSeo } from "@/components/DefaultSeo";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { calculeSemester } from "@/utils/calculateSemester";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      age: moment().diff(moment("2003-05-30"), "years", false),
      semesters: calculeSemester(),
    },
    revalidate: 60,
  };
};

interface Option {
  text: string;
  href: string;
  icon: JSX.Element;
}

const options: Option[] = [
  {
    text: "Cursos, Certificações e Formações",
    href: "/certificates",
    icon: <TbCertificate />,
  },
  {
    text: "Mural de Projetos",
    href: "/projects",
    icon: <TbApps />,
  },
  {
    text: "Redes Sociais e Contatos",
    href: "/contacts",
    icon: <TbUserCircle />,
  },
  {
    text: "Blog",
    href: "/blog",
    icon: <TbPencil />,
  },
];

export default function About(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { age, semesters } = props;

  const optionDispatcher = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const { currentTarget } = event;
      if (!containerRef.current) return;
      containerRef.current.classList.add(styles.hide);
      setTimeout(() => {
        router.push(currentTarget.href);
      }, 400);
    },
    [router]
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <DefaultSeo
        title="Guilherme Benevides - Sobre"
        description="Saiba mais sobre Guilherme Benevides, desenvolvedor web e mobile."
        image={getOpenMediaImageForNextSeo("Sobre Mim")}
        site_name="Site do Guilherme"
        type="website"
      />
      <div className={styles.firstArea}>
        <p className={styles.textDesktop}>
          Olá, meu nome é Guilherme da Silva Benevides, tenho {age} anos, e seja
          muito bem-vindo ao meu site. Sou um desenvolvedor proeficiente em
          Javascript/Typescript, com ampla experiência na criação de websites
          utilizando React, além de trabalhar com bancos de dados relacionais e
          não relacionais. Também tenho conhecimento em desenvolvimento de
          aplicativos móveis utilizando React Native, bem como no
          desenvolvimento de aplicações de servidor utilizando NodeJS. Além
          disso, possuo experiência de programação em Java, Python e C.
        </p>
        <p className={styles.textDesktop}>
          Atualmente, estou cursando o {semesters}º semestre de Análise e
          Desenvolvimento de Sistemas na Faculdade de Tecnologia de Mogi das
          Cruzes. Sou apaixonado por tecnologia e estou constantemente buscando
          aprimorar minhas habilidades. No momento, estou em busca da minha
          primeira oportunidade no mercado de TI. Caso queira conhecer mais
          sobre mim, navegue pelos itens ao lado para obter mais informações
          sobre minhas certificações, meu portfólio de projetos pessoais e meus
          links de contato.
        </p>
        <p className={styles.textMobile}>
          Olá, sou Guilherme Benevides, desenvolvedor especializado em
          Javascript/Typescript com experiência em React, bancos de dados e
          NodeJS. Também trabalho com React Native e tenho conhecimento em Java,
          Python e C. Estou cursando Análise e Desenvolvimento de Sistemas e em
          busca da minha primeira oportunidade no mercado de TI. Confira os
          itens abaixo para mais informações sobre certificações, portfólio e
          contatos.
        </p>
      </div>
      <nav className={styles.secondArea}>
        <ul>
          {options.map((option) => (
            <li key={option.href}>
              <Link href={option.href} onClick={optionDispatcher}>
                {option.icon}
                <p>{option.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
