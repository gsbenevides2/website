import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { TbCertificate, TbApps, TbUserCircle, TbPencil } from "react-icons/tb";
import { useCallback, useRef } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import moment from "moment";
import { NextSeo } from "next-seo";
import { DefaultSeo } from "@/components/DefaultSeo";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";

function calculeSemester() {
  const today = new Date();
  const transitionsDate = [
    new Date(2021, 11, 12),
    new Date(2022, 5, 30),
    new Date(2022, 11, 12),
    new Date(2023, 5, 30),
    new Date(2023, 11, 12),
    new Date(2024, 5, 30),
    new Date(2024, 11, 12),
    new Date(2025, 5, 30),
    new Date(2025, 11, 12),
    new Date(2026, 5, 30),
  ];

  for (let i = 0; i < transitionsDate.length; i++) {
    const transitionDate = transitionsDate[i];
    if (today < transitionDate) {
      return i + 1;
    }
  }
  return transitionsDate.length + 1;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      age: moment().diff(moment("2003-05-30"), "years", false),
      semesters: calculeSemester(),
    },
    revalidate: 60,
  };
};

export default function About(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { age, semesters } = props;

  const goToCertificates = useCallback(async () => {
    if (!containerRef.current) return;
    containerRef.current.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 400));
    router.push("/certificates");
  }, [containerRef, router]);

  const goToProjects = useCallback(async () => {
    if (!containerRef.current) return;
    containerRef.current.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 400));
    router.push("/projects");
  }, [containerRef, router]);

  const goToContacts = useCallback(async () => {
    if (!containerRef.current) return;
    containerRef.current.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 400));
    router.push("/contacts");
  }, [containerRef, router]);

  const goToBlog = useCallback(async () => {
    if (!containerRef.current) return;
    containerRef.current.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 400));
    router.push("/blog");
  }, [containerRef, router]);

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
        <p className={[styles.text, styles.textDesktop].join(" ")}>
          Olá, meu nome é Guilherme da Silva Benevides, tenho {age} anos, e seja
          muito bem-vindo ao meu site. Sou um desenvolvedor proeficiente em
          Javascript/Typescript, com ampla experiência na criação de websites
          utilizando React, além de trabalhar com bancos de dados relacionais e
          não relacionais. Também tenho conhecimento em desenvolvimento de
          aplicativos móveis utilizando React Native, bem como no
          desenvolvimento de aplicações de servidor utilizando NodeJS. Além
          disso, possuo experiência de programação em Java, Python e C.
        </p>
        <p className={[styles.text, styles.textDesktop].join(" ")}>
          Atualmente, estou cursando o {semesters}º semestre de Análise e
          Desenvolvimento de Sistemas na Faculdade de Tecnologia de Mogi das
          Cruzes. Sou apaixonado por tecnologia e estou constantemente buscando
          aprimorar minhas habilidades. No momento, estou em busca da minha
          primeira oportunidade no mercado de TI. Caso queira conhecer mais
          sobre mim, navegue pelos itens ao lado para obter mais informações
          sobre minhas certificações, meu portfólio de projetos pessoais e meus
          links de contato.
        </p>
        <p className={[styles.text, styles.textMobile].join(" ")}>
          Olá, sou Guilherme Benevides, desenvolvedor especializado em
          Javascript/Typescript com experiência em React, bancos de dados e
          NodeJS. Também trabalho com React Native e tenho conhecimento em Java,
          Python e C. Estou cursando Análise e Desenvolvimento de Sistemas e em
          busca da minha primeira oportunidade no mercado de TI. Confira os
          itens abaixo para mais informações sobre certificações, portfólio e
          contatos.
        </p>
      </div>
      <div className={styles.secondArea}>
        <ul>
          <li onClick={goToCertificates}>
            <TbCertificate />
            <span>Cursos, Certificações e Formações</span>
          </li>
          <li onClick={goToProjects}>
            <TbApps />
            <span>Mural de Projetos</span>
          </li>
          <li onClick={goToContacts}>
            <TbUserCircle />
            <span>Redes Sociais e Contatos</span>
          </li>
          <li onClick={goToBlog}>
            <TbPencil />
            <span>Blog</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
