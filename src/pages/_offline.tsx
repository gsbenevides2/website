import styles from "./404And500styles.module.scss";
import { DefaultSeo } from "@/components/DefaultSeo";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import SVGOffline from "@/components/OfflineSVG";

export default function Page404() {
  return (
    <div className={styles.container}>
      <DefaultSeo
        description="Ops! Parece que você está offline. Aproveite essa pausa para relaxar e voltar em breve para explorar tudo o que preparamos para você. Até logo! 👋"
        title="Offline: Uma pausa para recarregar ⚡️"
        image={getOpenMediaImageForNextSeo("Offline")}
        site_name="Site do Guilherme"
        type="website"
      />
      <div className={styles.textArea}>
        <h1>Offline: Uma pausa para recarregar ⚡️</h1>
        <p>
          Ops! Seu dispositivo está offline no momento. Aproveite essa pausa
          para relaxar e voltar em breve para explorar tudo o que preparamos
          para você. Até logo! 👋
        </p>
      </div>
      <div className={styles.svgArea}>
        <SVGOffline />
      </div>
    </div>
  );
}
