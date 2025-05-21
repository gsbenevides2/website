import { DefaultSeo } from "@/components/DefaultSeo";
import { ContactsCMSData, getCMSDataForContactsPage, useCMSDataForContactsPage } from "@/services/cms/contacts";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { InspectorModeTags } from "@contentful/live-preview/dist/inspectorMode/types";
import { GetStaticProps } from "next";
import Link from "next/link";
import { MdPix } from "react-icons/md";
import { SiMojangstudios } from "react-icons/si";
import { TbBrandGithub, TbBrandInstagram, TbBrandLinkedin, TbBrandX, TbMail, TbMusic } from "react-icons/tb";
import styles from "./styles.module.scss";

interface Props {
  cms: ContactsCMSData;
}

interface SocialMedia {
  name: string;
  style: string;
  url: string | null;
  props?: InspectorModeTags | {};
  icon: React.ReactNode;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { draftMode } = context;
  return {
    props: {
      cms: await getCMSDataForContactsPage(draftMode ?? true),
    },
  };
};

export default function Contacts(props: Props) {
  const cms = useCMSDataForContactsPage(props.cms);
  const socialMedias: SocialMedia[] = [
    {
      name: "X",
      style: styles.x,
      url: cms.fields.twitter,
      props: cms.props.twitter,
      icon: <TbBrandX />,
    },
    {
      name: "Linkedin",
      style: styles.linkedin,
      url: cms.fields.linkedin,
      props: cms.props.linkedin,
      icon: <TbBrandLinkedin />,
    },
    {
      name: "Github",
      style: styles.github,
      url: cms.fields.github,
      props: cms.props.github,
      icon: <TbBrandGithub />,
    },
    {
      name: "Instagram",
      style: styles.instagram,
      url: cms.fields.instagram,
      props: cms.props.instagram,
      icon: <TbBrandInstagram />,
    },
  ];
  const filteredSocialMedias = socialMedias.filter((socialMedia) => Boolean(socialMedia.url));

  return (
    <div className={styles.container}>
      <DefaultSeo title="Contatos" description="Contatos do Guilherme" image={getOpenMediaImageForNextSeo("Contatos")} site_name="Site do Guilherme" type="website" />
      <div className={styles.firstArea}>
        <h1>Contatos</h1>
        <ul className={styles.social}>
          {filteredSocialMedias.map((socialMedia) => (
            <li className={socialMedia.style} key={socialMedia.name} {...socialMedia.props}>
              <a href={socialMedia.url ?? ""} target="_blank" rel="noreferrer" className={socialMedia.name}>
                {socialMedia.icon}
                <p>{socialMedia.name}</p>
              </a>
            </li>
          ))}
        </ul>
        <div>
          <ul className={styles.other}>
            {cms.fields.email && cms.fields.sendEmailText && (
              <li {...cms.props.sendEmailText}>
                <a href={`mailto:${cms.fields.email}`}>
                  <TbMail />
                  {cms.fields.sendEmailText}
                </a>
              </li>
            )}
            {cms.fields.textOfPixOption && (
              <li {...cms.props.textOfPixOption}>
                <Link href="/pix">
                  <MdPix />
                  {cms.fields.textOfPixOption}
                </Link>
              </li>
            )}
            {cms.fields.musicPlaylistText && cms.fields.playlistLink && (
              <li {...cms.props.musicPlaylistText}>
                <a href={cms.fields.playlistLink} target="_blank">
                  <TbMusic />
                  {cms.fields.musicPlaylistText}
                </a>
              </li>
            )}
            {cms.fields.minecraftText && (
              <li {...cms.props.minecraftText}>
                <Link href="/minecraft">
                  <SiMojangstudios />
                  {cms.fields.minecraftText}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
