import { DefaultSeo } from "@/components/DefaultSeo";
import { getLatestVersionDataByPath } from "@/services/firebase/client/cms";
import { copyTextToClipboard } from "@/utils/copyTextToClipboard";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useCallback } from "react";
import { useAlert } from "react-alert";
import QRCode from "react-qr-code";
import styles from "./styles.module.scss";

interface CMSData {
  email: string;
  qrCode: string;
  warnings: string;
  accountInformation: string;
}

interface Props {
  cms: CMSData;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const cms = await getLatestVersionDataByPath<CMSData>("/pix");
  if (!cms) {
    return {
      notFound: true,
    };
  }

  const sourceAccountInformation = await serialize(cms.accountInformation);
  const sourceWarnings = await serialize(cms.warnings);
  return {
    props: {
      cms,
      sourceAccountInformation,
      sourceWarnings,
    },
  };
};

type ComponentProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Pix(props: ComponentProps) {
  const cms = props.cms;
  const alert = useAlert();
  const copyQrCode = useCallback(async () => {
    copyTextToClipboard(cms.qrCode)
      .then(() => {
        alert.success("Código copiado para a área de transferência");
      })
      .catch(() => {
        alert.error("Não foi possível copiar o código");
      });
  }, [alert, cms.qrCode]);
  const copyPixEmail = useCallback(async () => {
    copyTextToClipboard(cms.email)
      .then(() => {
        alert.success("E-mail copiado para a área de transferência");
      })
      .catch(() => {
        alert.error("Não foi possível copiar o e-mail");
      });
  }, [alert, cms.email]);

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
            <QRCode
              value={cms.qrCode}
              bgColor="transparent"
              fgColor="white"
            />
          </button>
        </div>
        <div>
          <div className={styles.textArea}>
            <p>
              <b>E-mail:</b> <a onClick={copyPixEmail}>{cms.email}</a>
            </p>
          </div>
          <div className={styles.accountInformation}>
            {/* @ts-ignore */}
            <MDXRemote {...props.sourceAccountInformation} />
          </div>
        </div>
      </div>
      <div className={styles.warning}>
        {/* @ts-ignore */}
        <MDXRemote {...props.sourceWarnings} />
      </div>
    </div>
  );
}
