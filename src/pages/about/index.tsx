import { DefaultSeo } from "@/components/DefaultSeo";
import { AboutCMSData, EnabledLinkName, getCMSDataForAboutPage, useCMSDataForAboutPage } from "@/services/cms/about";
import { calculeSemester } from "@/utils/calculateSemester";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import moment from "moment";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useRef } from "react";
import { TbApps, TbCertificate, TbPencil, TbUserCircle } from "react-icons/tb";
import styles from "./styles.module.scss";

interface Props {
  age: number;
  semesters: number;
  cms: AboutCMSData;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const isPreview = context.draftMode || false;
  const cms = await getCMSDataForAboutPage(isPreview);
  return {
    props: {
      age: moment().diff(moment("2003-05-30"), "years", false),
      semesters: calculeSemester(),
      cms,
    },
    revalidate: 60,
  };
};

interface Option {
  name: EnabledLinkName;
  text: string;
  href: string;
  icon: React.ReactNode;
}

const options: Option[] = [
  {
    name: "courses",
    text: "Cursos, Certificações e Formações",
    href: "/certificates",
    icon: <TbCertificate />,
  },
  {
    name: "projects",
    text: "Mural de Projetos",
    href: "/projects",
    icon: <TbApps />,
  },
  {
    name: "social",
    text: "Redes Sociais e Contatos",
    href: "/contacts",
    icon: <TbUserCircle />,
  },
  {
    name: "blog",
    text: "Blog",
    href: "/blog",
    icon: <TbPencil />,
  },
];

export default function About(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const cms = useCMSDataForAboutPage(props.cms);
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
  const textDesktop = cms.fields.textDesktop.replaceAll("{age}", age.toString()).replaceAll("{semesters}", semesters.toString());
  const textMobile = cms.fields.textMobile.replaceAll("{age}", age.toString()).replaceAll("{semesters}", semesters.toString());

  const filterOptions = options.filter((option) => (cms.entry.fields.enabledLinks as EnabledLinkName[]).includes(option.name));

  return (
    <div className={styles.container} ref={containerRef}>
      <DefaultSeo title="Guilherme Benevides - Sobre" description="Saiba mais sobre Guilherme Benevides, desenvolvedor web e mobile." image={getOpenMediaImageForNextSeo("Sobre Mim")} site_name="Site do Guilherme" type="website" />
      <div className={styles.firstArea}>
        <div {...cms.props.textDesktop} suppressHydrationWarning>
          {textDesktop.split("\n\n").map((text, index) => (
            <p key={index} className={styles.textDesktop} suppressHydrationWarning>
              {text}
            </p>
          ))}
        </div>

        <p className={styles.textMobile} suppressHydrationWarning {...cms.props.textMobile}>
          {textMobile}
        </p>
      </div>
      <nav className={styles.secondArea}>
        <ul suppressHydrationWarning {...cms.props.enabledLinks}>
          {filterOptions.map((option) => (
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
