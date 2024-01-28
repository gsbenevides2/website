import {
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandTwitter,
  TbBrandX,
  TbMail,
  TbMusic,
} from "react-icons/tb";
import { MdPix } from "react-icons/md";
import { SiMojangstudios } from "react-icons/si";
import styles from "./styles.module.scss";
import { DefaultSeo } from "@/components/DefaultSeo";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import Link from "next/link";

interface SocialMedia {
  name: string;
  style: string;
  url: string;
  icon: JSX.Element;
}

const socialMedias: SocialMedia[] = [
  {
    name: "X",
    style: styles.x,
    url: "https://x.com/gsbenevides2",
    icon: <TbBrandX />,
  },
  {
    name: "Linkedin",
    style: styles.linkedin,
    url: "https://linkedin.com/in/gsbenevides2",
    icon: <TbBrandLinkedin />,
  },
  {
    name: "Github",
    style: styles.github,
    url: "https://github.com/gsbenevides2",
    icon: <TbBrandGithub />,
  },
  {
    name: "Instagram",
    style: styles.instagram,
    url: "https://instagram.com/gsbenevides2",
    icon: <TbBrandInstagram />,
  },
];

export default function Contacts() {
  const copyPix = () => {
    navigator.clipboard.writeText("pix@gui.dev.br").then(() => {
      alert("PIX copiado para a área de transferência");
    });
  };

  return (
    <div className={styles.container}>
      <DefaultSeo
        title="Contatos"
        description="Contatos do Guilherme"
        image={getOpenMediaImageForNextSeo("Contatos")}
        site_name="Site do Guilherme"
        type="website"
      />
      <div className={styles.firstArea}>
        <h1>Contatos</h1>
        <ul className={styles.social}>
          {socialMedias.map((socialMedia) => (
            <li className={socialMedia.style} key={socialMedia.name}>
              <a
                href={socialMedia.url}
                target="_blank"
                rel="noreferrer"
                className={socialMedia.name}
              >
                {socialMedia.icon}
                <p>{socialMedia.name}</p>
              </a>
            </li>
          ))}
        </ul>
        <div>
          <ul className={styles.other}>
            <li>
              <a href="mailto:contato@gui.dev.br">
                <TbMail />
                Enviar um email
              </a>
            </li>
            <li>
              <Link href="/pix">
                <MdPix />
                Enviar um PIX
              </Link>
            </li>
            <li>
              <a
                href="https://www.youtube.com/playlist?list=PL7UWbfsHKcRPTRUWgPwyBh-ZxHhFD0kYy"
                target="_blank"
              >
                <TbMusic />
                Gosta de música? Ouça minha playlist no YouTube Music
              </a>
            </li>
            <li>
              <Link href="/minecraft">
                <SiMojangstudios />
                Gosta de Minecraft? Jogue comigo!
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
