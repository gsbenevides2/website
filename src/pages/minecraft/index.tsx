import { DefaultSeo } from "@/components/DefaultSeo";
import { getServerStatus } from "@/services/api/minecraft";
import { getLatestVersionDataByPath } from "@/services/firebase/client/cms";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { BedrockPingResponse } from "@minescope/mineping";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import localFont from "next/font/local";
import React from "react";
import styles from "./styles.module.css";
import Window from "./window";

export interface CMSData {
  type: "Bedrock" | "Java";
  ip: string;
  port: number;
  helperText: string;
}

interface Props {
  cms: CMSData;
}

const minecraftFont = localFont({
  src: [
    {
      weight: "400",
      style: "normal",
      path: "./1_MinecraftRegular1.woff",
    },
    {
      weight: "400",
      style: "italic",
      path: "./2_MinecraftItalic1.woff",
    },
    {
      weight: "700",
      style: "bold",
      path: "./3_MinecraftBold1.woff",
    },
    {
      weight: "700",
      style: "italic",
      path: "./4_MinecraftBoldItalic1.woff",
    },
  ],
  display: "swap",
});

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const cms = await getLatestVersionDataByPath<CMSData>("/minecraft");
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

type ComponentProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function MinecraftPage(props: ComponentProps) {
  const cms = props.cms;
  const [serverData, setServerData] = React.useState<
    BedrockPingResponse | false
  >();

  const makeStatusMessage = React.useMemo(() => {
    if (serverData === undefined) return "Carregando...";
    else if (serverData === false) return "Servidor offline";
    else if (serverData) return "Servidor online";
    else return "Erro ao carregar status";
  }, [serverData]);

  React.useEffect(() => {
    getServerStatus(false)
      .then(setServerData)
      .catch(() => {
        setServerData(false);
      });
  }, []);

  return (
    <div className={[minecraftFont.className, styles.container].join(" ")}>
      <DefaultSeo
        title="Minecraft - Site do Guilherme"
        description="Opa! Deseja jogar minecraft comigo?"
        image={getOpenMediaImageForNextSeo("Minecraft")}
        site_name="Site do Guilherme"
        type="website"
      />
      <div className={styles.modalCenter}>
        <Window transparent>
          <div className={styles.statusModal}>
            <h4>Conecte-se ao servidor:</h4>
            <div className={styles.dataContainer}>
              <p>Tipo de Minecraft: {cms.type}</p>
              <p>IP: {cms.ip}</p>
              <p>Porta: {cms.port}</p>
              <p>Status do Servidor: {makeStatusMessage}</p>
              {serverData && (
                <>
                  <p>
                    Jogadores online:{" "}
                    {serverData.players.online}/{serverData.players.max}
                  </p>
                </>
              )}
            </div>
            <p className={styles.centerText}>
              {cms.helperText}
            </p>
          </div>
        </Window>
      </div>
    </div>
  );
}
