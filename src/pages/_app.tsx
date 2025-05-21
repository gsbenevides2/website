import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppProps } from "next/app";
import { Nunito_Sans } from "next/font/google";
import Script from "next/script";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./globals.css";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export default function MyApp(props: AppProps) {
  const response = () => (<props.Component {...props.pageProps} />) as React.ReactNode;
  return (
    <main className={nunito.className}>
      <Provider template={AlertTemplate} position={positions.BOTTOM_CENTER}>
        {response()}
      </Provider>
      <Script async src="https://cdnjs.cloudflare.com/ajax/libs/jimp/0.22.8/jimp.min.js" />
      <Analytics />
      <SpeedInsights />
    </main>
  );
}
