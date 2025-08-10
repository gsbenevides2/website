import { DefaultSeo } from "@/components/DefaultSeo";
import { getLatestVersionDataByPath } from "@/services/firebase/client/cms";
import { calculeSemester } from "@/utils/calculateSemester";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import moment from "moment";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useRef } from "react";
import { TbApps, TbCertificate, TbPencil, TbUserCircle } from "react-icons/tb";
import styles from "./styles.module.scss";

type EnabledLinkName = "courses" | "projects" | "social" | "blog";
interface Props {
  age: number;
  semesters: number;
  cms: CMSData;
}

interface CMSData {
  textDesktop: string;
  textMobile: string;
  enabledLinks: EnabledLinkName[];
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const cms = await getLatestVersionDataByPath<CMSData>("/about");
  if (!cms) {
    return {
      notFound: true,
    };
  }
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

export default function About(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const cms = props.cms;
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
    [router],
  );
  const textDesktop = cms.textDesktop.replaceAll("{age}", age.toString())
    .replaceAll("{semesters}", semesters.toString());
  const textMobile = cms.textMobile.replaceAll("{age}", age.toString())
    .replaceAll("{semesters}", semesters.toString());

  const filterOptions = options.filter((option) =>
    (cms.enabledLinks as EnabledLinkName[]).includes(option.name)
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
        <div>
          {textDesktop.split("\n\n").map((text, index) => (
            <p
              key={index}
              className={styles.textDesktop}
              suppressHydrationWarning
            >
              {text}
            </p>
          ))}
        </div>

        <p className={styles.textMobile}>
          {textMobile}
        </p>
      </div>
      <nav className={styles.secondArea}>
        <ul>
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
