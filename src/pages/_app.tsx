import "./globals.css";
import { Nunito } from "next/font/google";
import { AppProps } from "next/app";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
const nunito = Nunito({ subsets: ["latin"] });

export default function MyApp(props: AppProps) {
  return (
    <main className={nunito.className}>
      <props.Component {...props.pageProps} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jimp/0.22.8/jimp.min.js" />
      <Analytics />
      <SpeedInsights />
    </main>
  );
}
