import { OpenGraphMedia } from "next-seo/lib/types";

export default function getOpenMediaImageForNextSeo(text:string):OpenGraphMedia{
    return {
        url:"/api/og?text="+text,
        alt:`Picrew do Guilherme com um fundo em gradiente de tom rosa com o texto: ${text}.`,
        width:500,
        height: 334,
    }
}