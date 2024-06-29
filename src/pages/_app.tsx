import "./globals.css";
import { Nunito } from "next/font/google";
import { AppProps } from "next/app";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
const nunito = Nunito({ subsets: ["latin"] });
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { ReactNode } from "react-dom/node_modules/@types/react";

export default function MyApp(props: AppProps) {
  const response = () =>
    (<props.Component {...props.pageProps} />) as ReactNode;
  return (
    <main className={nunito.className}>
      <Provider template={AlertTemplate} position={positions.BOTTOM_CENTER}>
        {response()}
      </Provider>
      <Script
        async
        src="https://cdnjs.cloudflare.com/ajax/libs/jimp/0.22.8/jimp.min.js"
      />
      <Analytics />
      <SpeedInsights />
    </main>
  );
}
