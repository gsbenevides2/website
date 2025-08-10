import { DefaultSeo } from "@/components/DefaultSeo";
import { getLatestVersionDataByPath } from "@/services/firebase/client/cms";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { GetStaticProps } from "next";
import Link from "next/link";
import { MdPix } from "react-icons/md";
import { SiMojangstudios } from "react-icons/si";
import {
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandX,
  TbMail,
  TbMusic,
} from "react-icons/tb";
import styles from "./styles.module.scss";

interface Props {
  cms: CMSData;
}

interface CMSData {
  email?: string;
  sendEmailText?: string;
  textOfPixOption?: string;
  musicPlaylistText?: string;
  playlistLink?: string;
  minecraftText?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  twitter?: string;
}

interface SocialMedia {
  name: string;
  style: string;
  url?: string;
  icon: React.ReactNode;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const cms = await getLatestVersionDataByPath<CMSData>("/contacts");
  if (!cms) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      cms,
    },
  };
};

export default function Contacts(props: Props) {
  const cms = props.cms;
  const socialMedias: SocialMedia[] = [
    {
      name: "X",
      style: styles.x,
      url: cms.twitter,
      icon: <TbBrandX />,
    },
    {
      name: "Linkedin",
      style: styles.linkedin,
      url: cms.linkedin,
      icon: <TbBrandLinkedin />,
    },
    {
      name: "Github",
      style: styles.github,
      url: cms.github,
      icon: <TbBrandGithub />,
    },
    {
      name: "Instagram",
      style: styles.instagram,
      url: cms.instagram,
      icon: <TbBrandInstagram />,
    },
  ];
  const filteredSocialMedias = socialMedias.filter((socialMedia) =>
    Boolean(socialMedia.url)
  );

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
          {filteredSocialMedias.map((socialMedia) => (
            <li
              className={socialMedia.style}
              key={socialMedia.name}
            >
              <a
                href={socialMedia.url ?? ""}
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
            {cms.email && cms.sendEmailText && (
              <li>
                <a href={`mailto:${cms.email}`}>
                  <TbMail />
                  {cms.sendEmailText}
                </a>
              </li>
            )}
            {cms.textOfPixOption && (
              <li>
                <Link href="/pix">
                  <MdPix />
                  {cms.textOfPixOption}
                </Link>
              </li>
            )}
            {cms.musicPlaylistText && cms.playlistLink && (
              <li>
                <a href={cms.playlistLink} target="_blank">
                  <TbMusic />
                  {cms.musicPlaylistText}
                </a>
              </li>
            )}
            {cms.minecraftText && (
              <li>
                <Link href="/minecraft">
                  <SiMojangstudios />
                  {cms.minecraftText}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
