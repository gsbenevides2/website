import {
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandTwitter,
  TbMail,
  TbMusic,
} from "react-icons/tb";
import { MdPix } from "react-icons/md";
import styles from "./styles.module.css";
import { DefaultSeo } from "@/components/DefaultSeo";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";

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
          <li className={styles.twitter}>
            <a
              href="https://twitter.com/gsbenevides2"
              target="_blank"
              rel="noreferrer"
              className="twitter"
            >
              <TbBrandTwitter />
              <span>Twitter</span>
            </a>
          </li>
          <li className={styles.linkedin}>
            <a
              href="https://linkedin.com/gsbenevides2"
              className="linkedin"
              target="_blank"
              rel="noreferrer"
            >
              <TbBrandLinkedin />
              <span>Linkedin</span>
            </a>
          </li>
          <li className={styles.github}>
            <a
              href="https://github.com/gsbenevides2"
              target="_blank"
              rel="noreferrer"
            >
              <TbBrandGithub />
              <span>Github</span>
            </a>
          </li>
          <li className={styles.instagram}>
            <a
              href="https://instagram.com/gsbenevides2"
              className="instagram"
              target="_blank"
              rel="noreferrer"
            >
              <TbBrandInstagram />
              <span>Instagram</span>
            </a>
          </li>
        </ul>
        <div>
          <ul className={styles.other}>
            <li>
              <a href="malito:gsbenevides2@gmail.com">
                <TbMail />
                Enviar um email
              </a>
            </li>
            <li>
              <a onClick={copyPix}>
                <MdPix />
                Enviar um PIX: pix@gui.dev.br
              </a>
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
          </ul>
        </div>
      </div>
    </div>
  );
}
