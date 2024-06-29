import { getServerStatus } from "@/services/api/minecraft";
import { MinecraftCMSData, getCMSDataForMinecraftPage, useCMSDataForMinecraftPage } from "@/services/cms/minecraft";
import { BedrockPingResponse } from "@minescope/mineping";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import localFont from "next/font/local";
import React from "react";
import styles from "./styles.module.css";
import Window from "./window";

interface Props {
  cms: MinecraftCMSData;
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
  const isPreview = context.draftMode || false;

  return {
    props: {
      cms: await getCMSDataForMinecraftPage(isPreview),
    },
  };
};

type ComponentProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function MinecraftPage(props: ComponentProps) {
  const cms = useCMSDataForMinecraftPage(props.cms);
  const [serverData, setServerData] = React.useState<BedrockPingResponse | false>();

  const makeStatusMessage = React.useMemo(() => {
    if (serverData === undefined) return "Carregando...";
    else if (serverData === false) return "Servidor offline";
    else if (serverData) return "Servidor online";
    else return "Erro ao carregar status";
  }, [serverData]);

  React.useEffect(() => {
    getServerStatus(props.cms.isPreview)
      .then(setServerData)
      .catch(() => {
        setServerData(false);
      });
  }, [props.cms.isPreview]);

  return (
    <div className={[minecraftFont.className, styles.container].join(" ")}>
      <div className={styles.modalCenter}>
        <Window transparent>
          <div className={styles.statusModal}>
            <h4>Conecte-se ao servidor:</h4>
            <div className={styles.dataContainer}>
              <p>Tipo de Minecraft: {cms.fields.type}</p>
              <p>IP: {cms.fields.ip}</p>
              <p>Porta: {cms.fields.port}</p>
              <p>Status do Servidor: {makeStatusMessage}</p>
              {serverData && (
                <>
                  <p>
                    Jogadores online: {serverData.players.online}/{serverData.players.max}
                  </p>
                </>
              )}
            </div>
            <p className={styles.centerText}>{cms.fields.helperText}</p>
          </div>
        </Window>
      </div>
    </div>
  );
}
