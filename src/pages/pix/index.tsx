import { copyTextToClipboard } from "@/utils/copyTextToClipboard";
import styles from "./styles.module.scss";
import { DefaultSeo } from "@/components/DefaultSeo";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { useCallback } from "react";
import QRCode from "react-qr-code";
import { useAlert } from "react-alert";

export default function Pix() {
  const PIX_EMAIL = "pix@gui.dev.br";
  const PIX_QR_CODE =
    "00020126360014br.gov.bcb.pix0114pix@gui.dev.br5204000053039865802BR5924Guilherme da Silva Benev6008Brasilia62080504mpda6304F8FA";
  const alert = useAlert();
  const copyQrCode = useCallback(async () => {
    copyTextToClipboard(PIX_QR_CODE)
      .then(() => {
        alert.success("Código copiado para a área de transferência");
      })
      .catch(() => {
        alert.error("Não foi possível copiar o código");
      });
  }, [alert]);
  const copyPixEmail = useCallback(async () => {
    copyTextToClipboard(PIX_EMAIL)
      .then(() => {
        alert.success("E-mail copiado para a área de transferência");
      })
      .catch(() => {
        alert.error("Não foi possível copiar o e-mail");
      });
  }, [alert]);

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
          <button onClick={copyQrCode}>
            <QRCode value={PIX_QR_CODE} bgColor="transparent" fgColor="white" />
          </button>
        </div>
        <div className={styles.textArea}>
          <p>
            <b>Chave PIX: </b>
            <a onClick={copyPixEmail}>{PIX_EMAIL}</a>
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
