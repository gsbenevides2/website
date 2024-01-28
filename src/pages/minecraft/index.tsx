import localFont from "next/font/local";
import styles from "./styles.module.css";
import React from "react";
import Window from "./window";
import { BedrockPingResponse } from "@minescope/mineping";
import { getServerStatus } from "@/services/api/minecraft";

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

function MinecraftPage() {
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
    getServerStatus()
      .then(setServerData)
      .catch(() => {
        setServerData(false);
      });
  }, []);

  return (
    <div className={[minecraftFont.className, styles.container].join(" ")}>
      <div className={styles.modalCenter}>
        <Window transparent>
          <div className={styles.statusModal}>
            <h4>Conecte-se ao servidor:</h4>
            <div className={styles.dataContainer}>
              <p>Tipo de Minecraft: Bedrock</p>
              <p>IP: google.gui.dev.br</p>
              <p>Porta: 19232</p>
              <p>Status do Servidor: {makeStatusMessage}</p>
              {serverData && (
                <>
                  <p>
                    Jogadores online: {serverData.players.online}/
                    {serverData.players.max}
                  </p>
                </>
              )}
            </div>
            <p className={styles.centerText}>
              Peça permissão para o Guilherme para jogar no servidor!
            </p>
          </div>
        </Window>
      </div>
    </div>
  );
}

export default MinecraftPage;
