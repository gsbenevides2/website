import { DefaultSeo } from "@/components/DefaultSeo";
import { getLatestVersionDataByPath } from "@/services/firebase/client/cms";
import { copyTextToClipboard } from "@/utils/copyTextToClipboard";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { useToast } from "@/hooks/useToast";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXClient } from "next-mdx-remote-client";
import { serialize } from "next-mdx-remote-client/serialize";
import { useCallback } from "react";
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

  const sourceAccountInformation = await serialize({
    source: cms.accountInformation,
  });
  const sourceWarnings = await serialize({
    source: cms.warnings,
  });
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
  const toast = useToast();
  const copyQrCode = useCallback(async () => {
    copyTextToClipboard(cms.qrCode)
      .then(() => {
        toast.success("Código copiado para a área de transferência");
      })
      .catch(() => {
        toast.error("Não foi possível copiar o código");
      });
  }, [toast, cms.qrCode]);
  const copyPixEmail = useCallback(async () => {
    copyTextToClipboard(cms.email)
      .then(() => {
        toast.success("E-mail copiado para a área de transferência");
      })
      .catch(() => {
        toast.error("Não foi possível copiar o e-mail");
      });
  }, [toast, cms.email]);

  return (
    <div className={styles.container}>
      <DefaultSeo
        title="Guilherme Benevides - PIX"
        description="Faça um PIX para o Guilherme"
        image={getOpenMediaImageForNextSeo("PIX")}
        site_name="Site do Guilherme"
        type="website"
        canonical={process.env.NEXT_PUBLIC_DOMAIN + "/pix"}
        keywords={["pix", "guilherme benevides", "doação", "apoio"]}
      />
      <h1>PIX</h1>
      <div className={styles.content}>
        <div className={styles.qrCode}>
          <button onClick={copyQrCode}>
            <QRCode value={cms.qrCode} bgColor="transparent" fgColor="white" />
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
            <MDXClient {...props.sourceAccountInformation} />
          </div>
        </div>
      </div>
      <div className={styles.warning}>
        {/* @ts-ignore */}
        <MDXClient {...props.sourceWarnings} />
      </div>
    </div>
  );
}
