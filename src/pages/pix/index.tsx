import { DefaultSeo } from "@/components/DefaultSeo";
import RichTextComponent from "@/services/cms/RichTextComponent";
import { PixCMSData, getCMSDataForPixPage, useCMSDataForPixPage } from "@/services/cms/pix";
import { copyTextToClipboard } from "@/utils/copyTextToClipboard";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useCallback } from "react";
import { useAlert } from "react-alert";
import QRCode from "react-qr-code";
import styles from "./styles.module.scss";

interface Props {
  cms: PixCMSData;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const isPreview = context.draftMode || false;

  return {
    props: {
      cms: await getCMSDataForPixPage(isPreview),
    },
  };
};

type ComponentProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Pix(props: ComponentProps) {
  const cms = useCMSDataForPixPage(props.cms);
  const alert = useAlert();
  const copyQrCode = useCallback(async () => {
    copyTextToClipboard(cms.fields.qrCode)
      .then(() => {
        alert.success("Código copiado para a área de transferência");
      })
      .catch(() => {
        alert.error("Não foi possível copiar o código");
      });
  }, [alert, cms.fields.qrCode]);
  const copyPixEmail = useCallback(async () => {
    copyTextToClipboard(cms.fields.email)
      .then(() => {
        alert.success("E-mail copiado para a área de transferência");
      })
      .catch(() => {
        alert.error("Não foi possível copiar o e-mail");
      });
  }, [alert, cms.fields.email]);

  return (
    <div className={styles.container}>
      <DefaultSeo title="Guilherme Benevides - PIX" description="Faça um PIX para o Guilherme" image={getOpenMediaImageForNextSeo("PIX")} site_name="Site do Guilherme" type="website" />
      <h1>PIX</h1>
      <div className={styles.content}>
        <div className={styles.qrCode}>
          <button onClick={copyQrCode}>
            <QRCode value={cms.fields.qrCode} bgColor="transparent" fgColor="white" {...cms.props.qrCode} />
          </button>
        </div>
        <div>
          <div className={styles.textArea} {...cms.props.email}>
            <p>
              <b>E-mail:</b> <a onClick={copyPixEmail}>{cms.fields.email}</a>
            </p>
          </div>
          <RichTextComponent className={styles.textArea} content={cms.fields.accountInformation} contentFullFieldProps={cms.props.accountInformation} />
        </div>
      </div>
      <RichTextComponent className={styles.warning} content={cms.fields.warnings} contentFullFieldProps={cms.props.warnings} />
    </div>
  );
}
