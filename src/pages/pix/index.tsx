import styles from "./styles.module.scss";
import { DefaultSeo } from "@/components/DefaultSeo";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import QRCode from "react-qr-code";

export default function Pix() {
  const PIX_QR_CODE =
    "00020126360014br.gov.bcb.pix0114pix@gui.dev.br5204000053039865802BR5924Guilherme da Silva Benev6008Brasilia62080504mpda6304F8FA";
  return (
    <div className={styles.container}>
      <DefaultSeo
        title="Guilherme Benevides - PIX"
        description="Faça um PIX para o Guilherme"
        image={getOpenMediaImageForNextSeo("PIX")}
        site_name="Site do Guilherme"
        type="website"
      />
      <h1>PIX</h1>
      <div className={styles.content}>
        <div className={styles.qrCode}>
          <QRCode value={PIX_QR_CODE} bgColor="transparent" fgColor="white" />
        </div>
        <div className={styles.textArea}>
          <p>
            <b>Chave PIX: </b>
            <a>pix@gui.dev.br</a>
            <br />
            <b>Nome: </b>Guilherme da Silva Benevides
            <br />
            <b>CPF: </b>***.409.328-**
            <br />
            <b>Instituição Financeira: </b> Mercado Pago
          </p>
        </div>
      </div>
      <p className={styles.warning}>
        <b>Avisos Importates: </b>
        <br />
        Fique atento, se as informações não baterem, não faça o PIX!
        <br />
        Atenção, a doação é um ato voluntário, não é obrigatório, e que não
        poderá ser revertida.
      </p>
    </div>
  );
}
