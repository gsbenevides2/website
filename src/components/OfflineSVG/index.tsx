import React, { useEffect } from "react";

export default function SVGOffline() {
  const ref = React.useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svgEl = ref.current;
    if (!svgEl) return;
    setTimeout(() => {
      svgEl.classList.add("animated");
    }, 1000);
  }, [ref]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="freepik_stories-internet-on-the-go"
      className="animated"
      version="1.1"
      viewBox="0 0 500 500"
      ref={ref}
    >
      <g
        id="freepik--background-simple--inject-3"
        style={{
          WebkitTransformOrigin: 245.254,
          msTransformOrigin: 245.254,
          transformOrigin: 245.254,
        }}
        className="animable"
      >
        <path
          d="M380.89 97.14s-24.51 9.53-53.92-12.5-64.74-51-108-37.85-31.18 58.74-53.28 78.79-49.16-.82-86.49 17-38.2 58.79-28.67 82.13S80.09 259.61 78 292.4s-24.11 66.88-2.87 90.14 37.67 15.77 90.23 15.75 60 40.53 108 41.36 65.21-46.1 90.85-61.5 56.16-2.74 75.86-31-25.19-85.26-23.15-128.58 18.62-39 13.5-76.17c-7.42-53.76-49.53-45.26-49.53-45.26z"
          style={{
            WebkitTransformOrigin: 245.254,
            msTransformOrigin: 245.254,
            transformOrigin: 245.254,
          }}
          id="elu9dk1r3o3r"
          fill="#E31A50"
          className="animable"
        ></path>
        <path
          d="M380.89 97.14s-24.51 9.53-53.92-12.5-64.74-51-108-37.85-31.18 58.74-53.28 78.79-49.16-.82-86.49 17-38.2 58.79-28.67 82.13S80.09 259.61 78 292.4s-24.11 66.88-2.87 90.14 37.67 15.77 90.23 15.75 60 40.53 108 41.36 65.21-46.1 90.85-61.5 56.16-2.74 75.86-31-25.19-85.26-23.15-128.58 18.62-39 13.5-76.17c-7.42-53.76-49.53-45.26-49.53-45.26z"
          style={{
            WebkitTransformOrigin: 245.254,
            msTransformOrigin: 245.254,
            transformOrigin: 245.254,
          }}
          id="elcyh5illomfq"
          fill="#FFF"
          className="animable"
          opacity="0.7"
        ></path>
      </g>
      <g
        id="freepik--Icon--inject-3"
        style={{
          WebkitTransformOrigin: 250,
          msTransformOrigin: 250,
          transformOrigin: 250,
        }}
        className="animable"
      >
        <path
          d="M250 108c-78.3 0-142 63.7-142 142s63.7 142 142 142 142-63.7 142-142-63.7-142-142-142zm79.05 36.33a132.26 132.26 0 01-22 13.3c-1-2.31-2.09-4.58-3.21-6.78-6.11-12-13.16-21.62-20.88-28.7a131.5 131.5 0 0146.09 22.18zM250 382c-16.69 0-32.66-13.28-45-37.41-1-2-2-4.09-2.95-6.21a131.88 131.88 0 0195.82 0c-1 2.12-1.93 4.2-3 6.21C282.66 368.74 266.69 382 250 382zm0-62.61a142.29 142.29 0 00-51.72 9.76c-8.54-22.77-13.16-50.24-13.16-79.17s4.62-56.41 13.17-79.18a141.82 141.82 0 00103.43 0c8.54 22.77 13.16 50.24 13.16 79.17s-4.62 56.4-13.16 79.17a142 142 0 00-51.72-9.73zm0-148.8a132.33 132.33 0 01-47.91-9c.95-2.11 1.93-4.19 2.95-6.2 12.3-24.12 28.27-37.41 45-37.41s32.66 13.29 45 37.41c1 2 2 4.09 3 6.21a132.16 132.16 0 01-48.04 9.01zm-53.85-19.76c-1.12 2.2-2.18 4.47-3.21 6.78a131.85 131.85 0 01-22-13.3A131.5 131.5 0 01217 122.15c-7.69 7.08-14.74 16.72-20.85 28.7zM118 250a131.76 131.76 0 0145-99.2 141.9 141.9 0 0026.12 16.06c-9.06 24-14 52.86-14 83.14s4.91 59.14 14 83.14A141.23 141.23 0 00163 349.2a131.79 131.79 0 01-45-99.2zm53 105.68a131.64 131.64 0 0122-13.31c1 2.31 2.09 4.58 3.21 6.78 6.11 12 13.16 21.62 20.88 28.7A131.65 131.65 0 01171 355.68zm132.9-6.53c1.12-2.2 2.18-4.47 3.21-6.78a132.26 132.26 0 0122 13.3A131.5 131.5 0 01283 377.85c7.69-7.08 14.74-16.72 20.85-28.7zm33.17 0a141.72 141.72 0 00-26.13-16.05c9.06-24 14-52.86 14-83.14s-4.9-59.14-14-83.14A141.72 141.72 0 00337 150.81a131.82 131.82 0 010 198.38z"
          style={{
            WebkitTransformOrigin: 250,
            msTransformOrigin: 250,
            transformOrigin: 250,
          }}
          id="elvvorijklsg"
          fill="#FFF"
          className="animable"
          opacity="0.6"
        ></path>
      </g>
      <g
        id="freepik--Character--inject-3"
        style={{
          WebkitTransformOrigin: 242.001,
          msTransformOrigin: 242.001,
          transformOrigin: 242.001,
        }}
        className="animable"
      >
        <path
          d="M272.15 348.41c0 2.82-11.68 5.11-26.1 5.11s-26.1-2.29-26.1-5.11 11.69-5.1 26.1-5.1 26.1 2.28 26.1 5.1z"
          style={{
            WebkitTransformOrigin: 246.05,
            msTransformOrigin: 246.05,
            transformOrigin: 246.05,
          }}
          id="elnx8ev23t6bn"
          fill="#263238"
          className="animable"
        ></path>
        <ellipse
          cx="293.71"
          cy="368.27"
          fill="#263238"
          rx="28.94"
          ry="5.67"
          style={{
            WebkitTransformOrigin: 293.71,
            msTransformOrigin: 293.71,
            transformOrigin: 293.71,
          }}
          id="eldgtgbeaqv2"
          className="animable"
        ></ellipse>
        <path
          d="M277.92 158.16s4-5.46 13.56-4.52 12.52 8.13 12.52 8.13a85.08 85.08 0 0116.59-.2c9.83.74 16 6.5 14.24 9.81s-8.56 14.5-15.79 16.4-18.79-1.83-24.26-4.55-16.82-20.08-16.82-20.08z"
          style={{
            WebkitTransformOrigin: 306.525,
            msTransformOrigin: 306.525,
            transformOrigin: 306.525,
          }}
          id="el3cidd5oikcy"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M304.45 176.15s6.89-1.73 12.41.34"
          style={{
            WebkitTransformOrigin: 310.655,
            msTransformOrigin: 310.655,
            transformOrigin: 310.655,
          }}
          id="elfryxgqqud35"
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M318.8 186.23s-1.66-6.33.88-15.86 9.79-10.55 14.94-7.75c7.32 4 8 12.55 8 12.55s-14.28-4.6-23.59 12.61"
          style={{
            WebkitTransformOrigin: 330.444,
            msTransformOrigin: 330.444,
            transformOrigin: 330.444,
          }}
          id="eletjlpzi25fo"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M304.6 161.84c.5 5.94-7.57 5.15-15.34 5.8s-12.28 2.5-12.78-3.45 5.39-11.29 13.16-11.94 14.46 3.64 14.96 9.59z"
          style={{
            WebkitTransformOrigin: 290.536,
            msTransformOrigin: 290.536,
            transformOrigin: 290.536,
          }}
          id="el65nbuh3frx6"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M330.91 214.05c-2.56-1.93-8.36-5.94-8.36-5.94s-6 2.06-9.41 5.72 1.26 12.32 6.47 15a13.78 13.78 0 004.84 1.51c.07 1.27.08 2.45.08 2.45s-.61 1.35 2.86-.38c6.2-3.11 10.02-13.41 3.52-18.36z"
          style={{
            WebkitTransformOrigin: 323.133,
            msTransformOrigin: 323.133,
            transformOrigin: 323.133,
          }}
          id="elvt697a2zd0r"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M327 229.28s1 2.22.65 3.33-2.43 1.94-3.21.43 1.06-4.16 2.56-3.76z"
          style={{
            WebkitTransformOrigin: 325.989,
            msTransformOrigin: 325.989,
            transformOrigin: 325.989,
          }}
          id="el4e28oe9cdyt"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M314.49 222.46c-.9 1.63-1.09 3.91-.53 5 1.49 2.9 3.21.53 3.92-1.19s2.12-5.15-.05-5.61a3 3 0 00-3.34 1.8z"
          style={{
            WebkitTransformOrigin: 316.317,
            msTransformOrigin: 316.317,
            transformOrigin: 316.317,
          }}
          id="el57jdwk2a1s7"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M316.89 224.36c-.9 1.63-1.09 3.91-.53 5 1.49 2.9 3.2.53 3.91-1.19s2.13-5.15 0-5.61a3 3 0 00-3.38 1.8z"
          style={{
            WebkitTransformOrigin: 318.72,
            msTransformOrigin: 318.72,
            transformOrigin: 318.72,
          }}
          id="el2aqsy9esbqm"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M320.19 226.1c-.9 1.63-1.08 3.91-.53 5 1.49 2.9 3.21.53 3.92-1.19s2.13-5.15-.05-5.61a3 3 0 00-3.34 1.8z"
          style={{
            WebkitTransformOrigin: 322.021,
            msTransformOrigin: 322.021,
            transformOrigin: 322.021,
          }}
          id="elasngirezezh"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M323.54 226.8c-.9 1.64-1.09 3.91-.53 5 1.49 2.9 3.21.53 3.92-1.19s2.12-5.15-.05-5.61a3 3 0 00-3.34 1.8z"
          style={{
            WebkitTransformOrigin: 325.367,
            msTransformOrigin: 325.367,
            transformOrigin: 325.367,
          }}
          id="el9e1t6je4st"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M313.14 213.83s-4.29 3.82-3.18 6.84 9.13 6.46 10.2 3-3.91-5.53-3.91-5.53l-2.76-1.8"
          style={{
            WebkitTransformOrigin: 315.044,
            msTransformOrigin: 315.044,
            transformOrigin: 315.044,
          }}
          id="elvc2urnvtif"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M323.55 215.83a4.78 4.78 0 00-2 4.65c.37 3.22 4.09 3.82 4.09 3.82"
          style={{
            WebkitTransformOrigin: 323.567,
            msTransformOrigin: 323.567,
            transformOrigin: 323.567,
          }}
          id="elpjubpm2p4vh"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M332.17 166.36a17.18 17.18 0 00-12.86 11.24c-3.37 9.8-2.19 30.54-1.41 33.07s7.41 6 11 5.44 5.46-2.27 6.9-5.38 10.5-17.73 8.8-29.68-3.41-13.85-12.43-14.69z"
          style={{
            WebkitTransformOrigin: 330.93,
            msTransformOrigin: 330.93,
            transformOrigin: 330.93,
          }}
          id="elw4qkblzyt49"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M340.1 171.16s3.29 8.42 1.83 16.47-8.42 23.06-8.42 23.06"
          style={{
            WebkitTransformOrigin: 337.907,
            msTransformOrigin: 337.907,
            transformOrigin: 337.907,
          }}
          id="elxyaygpk7gur"
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M326.91 212.82a18.14 18.14 0 01-9.48-5.6 21.62 21.62 0 00.47 3.45c.79 2.53 7.41 6 11 5.44a8.07 8.07 0 005.89-3.58 16.76 16.76 0 01-7.88.29z"
          style={{
            WebkitTransformOrigin: 326.11,
            msTransformOrigin: 326.11,
            transformOrigin: 326.11,
          }}
          id="eli4rzv13elo"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M314.1 217s-3.54.39-4.14 3.69c0 0-.67-3.6 1.58-4.73s2.56 1.04 2.56 1.04z"
          style={{
            WebkitTransformOrigin: 311.983,
            msTransformOrigin: 311.983,
            transformOrigin: 311.983,
          }}
          id="elmmq8rgoulyg"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M216.73 156.28s7 6.32 5.86 9.13-2.11 3.75-.94 4.69 4.22.7 4.22.7 4.21 4.68 7 4.68 19.21-15.22 19.44-17.33-2.57-5.39-5.62-11-9.6-13.11-15.46-10.54-14.5 19.67-14.5 19.67z"
          style={{
            WebkitTransformOrigin: 234.527,
            msTransformOrigin: 234.527,
            transformOrigin: 234.527,
          }}
          id="elhky8vq6h9rr"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M221.18 158.62s0-3.75 3.28-2.81"
          style={{
            WebkitTransformOrigin: 222.82,
            msTransformOrigin: 222.82,
            transformOrigin: 222.82,
          }}
          id="ellpbwzqx21kd"
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M225.9 159.79c.52.66.62 1.45.22 1.77s-1.16.06-1.69-.6-.62-1.45-.22-1.77 1.16-.06 1.69.6z"
          style={{
            WebkitTransformOrigin: 225.163,
            msTransformOrigin: 225.163,
            transformOrigin: 225.163,
          }}
          id="elp01x812xeo"
          fill="#263238"
          className="animable"
        ></path>
        <path
          d="M242.5 153.93l-2.81 1.88s2.1 6.79 2.1 8.66v4.46"
          style={{
            WebkitTransformOrigin: 241.095,
            msTransformOrigin: 241.095,
            transformOrigin: 241.095,
          }}
          id="elkqbc2evt848"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M228.79 170.38s2-.29 2.32-3.77"
          style={{
            WebkitTransformOrigin: 229.95,
            msTransformOrigin: 229.95,
            transformOrigin: 229.95,
          }}
          id="el2ji1zm5eaou"
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        ></path>
        <path
          d="M228.91 143.86s-7.26 14.06-13.82 15.7-10.54-3.52-8.43-10.78 9.84-17.1 13.82-15.69 2.11 4.92 4 2.34 4-9.6 13.35-9.37 10.07 8.43 10.78 14.29 5.62 11.71 4.92 13.35-4 3.51-6.33 3.05-4.68-2.82-4.68-2.82.47-9.6-3.28-9.6-2.34 7.5-2.34 7.5-.24-1.64-2.82-1.64-3.74 2.11-5.15 1.17-.02-7.5-.02-7.5z"
          style={{
            WebkitTransformOrigin: 229.845,
            msTransformOrigin: 229.845,
            transformOrigin: 229.845,
          }}
          id="elu0iu1na5r2c"
          fill="#263238"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        ></path>
        <path
          d="M215.07 156.05a11.22 11.22 0 008.29-7.4c2.07-6.36 2.51-9 9.17-11.1s8.81 1.35 12.43 2.07"
          style={{
            WebkitTransformOrigin: 230.015,
            msTransformOrigin: 230.015,
            transformOrigin: 230.015,
          }}
          id="elpfdv7etzj5h"
          fill="none"
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.5"
          className="animable"
        ></path>
        <path
          d="M230 146.58s1.33-5 6.06-5.77 7.55 4 10.51 4.44"
          style={{
            WebkitTransformOrigin: 238.285,
            msTransformOrigin: 238.285,
            transformOrigin: 238.285,
          }}
          id="ely0feupnovv"
          fill="none"
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.5"
          className="animable"
        ></path>
        <path
          d="M237.41 142.88s-2.81 4.73-4.14 6.36a3.94 3.94 0 01-3.4 1.33"
          style={{
            WebkitTransformOrigin: 233.64,
            msTransformOrigin: 233.64,
            transformOrigin: 233.64,
          }}
          id="elk39sgc9sl8"
          fill="none"
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.5"
          className="animable"
        ></path>
        <path
          d="M221.28 142.73s-1.33 5.48-6.95 6.36-.3-8.58 3.4-8.14 0 3.41-.59 3.7"
          style={{
            WebkitTransformOrigin: 216.582,
            msTransformOrigin: 216.582,
            transformOrigin: 216.582,
          }}
          id="el9ghc5zn148"
          fill="none"
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.5"
          className="animable"
        ></path>
        <path
          d="M228.21 180.17s28.57-15.7 37.24-17.57 10.07-.94 11.95-1.87-5.86-8.43-18.27-7.26-18.51 8.19-23.43 14.05a49.83 49.83 0 00-7.49 12.65z"
          style={{
            WebkitTransformOrigin: 252.945,
            msTransformOrigin: 252.945,
            transformOrigin: 252.945,
          }}
          id="el1ao87ai9kki"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M156.1 168.88l7.15 23.67 11.25-3.75-7.13-23.6a1.27 1.27 0 00-1.61-.84l-8.84 2.95a1.27 1.27 0 00-.82 1.57z"
          style={{
            WebkitTransformOrigin: 165.273,
            msTransformOrigin: 165.273,
            transformOrigin: 165.273,
          }}
          id="ele55e4judgvt"
          fill="#263238"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        ></path>
        <path
          d="M158.36 170.65l5.35 17.75 8.53-2.85-5.34-17.68a1.16 1.16 0 00-1.48-.77l-6.32 2.11a1.15 1.15 0 00-.74 1.44z"
          style={{
            WebkitTransformOrigin: 165.273,
            msTransformOrigin: 165.273,
            transformOrigin: 165.273,
          }}
          id="el8t63j82cjmp"
          fill="#FFF"
          className="animable"
        ></path>
        <path
          d="M172.49 144.54c-5.06-2.85-11.84-3.55-18.14-1.89s-12 5.71-14.93 10.76a1.69 1.69 0 00.61 2.31 1.66 1.66 0 001.28.18 1.7 1.7 0 001-.78c2.52-4.3 7.33-7.73 12.87-9.2a21.42 21.42 0 0115.62 1.56 1.69 1.69 0 101.66-2.94z"
          style={{
            WebkitTransformOrigin: 156.29,
            msTransformOrigin: 156.29,
            transformOrigin: 156.29,
          }}
          id="eleoq5wcks67u"
          fill="#E31A50"
          className="animable"
        ></path>
        <path
          d="M169.28 150.45a19.91 19.91 0 00-24.11 6.44 1.7 1.7 0 00.42 2.35 1.72 1.72 0 001.4.25 1.68 1.68 0 00.95-.67 16.51 16.51 0 0119.9-5.31 1.69 1.69 0 001.44-3.06z"
          style={{
            WebkitTransformOrigin: 157.561,
            msTransformOrigin: 157.561,
            transformOrigin: 157.561,
          }}
          id="elrcn8p8rs6a"
          fill="#E31A50"
          className="animable"
        ></path>
        <path
          d="M166 156.31a12.29 12.29 0 00-15.25 4.25 1.69 1.69 0 001.81 2.61 1.74 1.74 0 00.94-.65 8.92 8.92 0 0111.15-3.11 1.69 1.69 0 001.35-3.1z"
          style={{
            WebkitTransformOrigin: 158.728,
            msTransformOrigin: 158.728,
            transformOrigin: 158.728,
          }}
          id="elmk2eehw6fpc"
          fill="#E31A50"
          className="animable"
        ></path>
        <path
          d="M236.27 331.13a24.16 24.16 0 01-6.33 3.9c-2.92 1-6.08-2.44-8.76 1s-2.92 7.79 1.7 10.47 8.52 4.38 11.93 3.89 8-1.7 11.43-.73 9.49 3.16 12.66 1.22 3.65-6.33 2.92-9-3.17-11.68-3.17-11.68-18 4.1-22.38.93z"
          style={{
            WebkitTransformOrigin: 240.691,
            msTransformOrigin: 240.691,
            transformOrigin: 240.691,
          }}
          id="eliv0yqov7f4"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M256 347.2c-5.11 1.46-7.79-1.46-10.71-1.46s-7.3 1.7-14.11.24a40.51 40.51 0 01-11.89-5.25c-.07 2.13 1 4.21 3.61 5.74 4.63 2.67 8.52 4.38 11.93 3.89s8-1.7 11.43-.73 9.49 3.16 12.66 1.22c2.7-1.67 3.45-5.11 3.15-7.74a11.81 11.81 0 01-6.07 4.09z"
          style={{
            WebkitTransformOrigin: 240.709,
            msTransformOrigin: 240.709,
            transformOrigin: 240.709,
          }}
          id="el2o4u068k7vr"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M299.05 254.48s-6.57 15.82-13.87 22.88-24.34 14.35-24.34 14.35 1.46 33.34.25 37.48-10.95 5.35-11.93 8 0 8-2.43 10-5.84 1.94-6.81-1.22.24-8.52-1.71-11.44-1.7-1-3.65-5.11-2.67-21.66-2.67-31.39 2.92-18 5.35-23.85 9.25-12.9 15.57-15.33 46.24-4.37 46.24-4.37z"
          style={{
            WebkitTransformOrigin: 265.47,
            msTransformOrigin: 265.47,
            transformOrigin: 265.47,
          }}
          id="elq7wc8ljkpyr"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M299.05 254.48s-6.57 15.82-13.87 22.88-24.34 14.35-24.34 14.35 1.46 33.34.25 37.48-10.95 5.35-11.93 8 0 8-2.43 10-5.84 1.94-6.81-1.22.24-8.52-1.71-11.44-1.7-1-3.65-5.11-2.67-21.66-2.67-31.39 2.92-18 5.35-23.85 9.25-12.9 15.57-15.33 46.24-4.37 46.24-4.37z"
          style={{
            WebkitTransformOrigin: 265.47,
            msTransformOrigin: 265.47,
            transformOrigin: 265.47,
          }}
          id="el1ycwzjijo9"
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
          opacity="0.5"
        ></path>
        <path
          d="M234.08 251.56s-4.38 26-1 41.61 8.52 27.5 13.87 29.45 21.9-12.66 21.9-17.77-.73-17.27-.24-27.49 1-11.69 1-11.69z"
          style={{
            WebkitTransformOrigin: 250.705,
            msTransformOrigin: 250.705,
            transformOrigin: 250.705,
          }}
          id="elwqe1lrei6v"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M270.09 304.37s-1.22-4.87-10.22-5.11-13.38 10.46-14.6 16.06 1.22 11.92 5.6 12.41 20.68-11.44 19.22-23.36z"
          style={{
            WebkitTransformOrigin: 257.569,
            msTransformOrigin: 257.569,
            transformOrigin: 257.569,
          }}
          id="elja7v7jsg1w"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M235.07 235.25s-1.85 14.61-.82 20.16 17.28 15.64 30.86 15.64 27.77-5.15 34.15-14.82.62-22.83.62-22.83-17.49 6.58-32.92 7-31.89-5.15-31.89-5.15z"
          style={{
            WebkitTransformOrigin: 268.102,
            msTransformOrigin: 268.102,
            transformOrigin: 268.102,
          }}
          id="elyuby2ltkj1f"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M180.66 202.89s.47-6.56-1.87-9.84-5.86-6.79-5.86-8.2 3.52-5.62.94-6.79-5.15.94-5.86 4 .24 7.73.24 7.73a5.23 5.23 0 01-2 .25c-1.42 0-6.13-2.25-7.72-2.25s-4.16 2.25-3.1 4.74 2.91 3.44 2.91 4.15-2.55 2.94-1.66 4.54a10.83 10.83 0 002.12 2.66s-.88 2.48-.53 3.72 2.31 2.48 2.31 2.48-.36 1.24 3 2.66 9.4 1.07 11-.53 6.08-9.32 6.08-9.32z"
          style={{
            WebkitTransformOrigin: 167.94,
            msTransformOrigin: 167.94,
            transformOrigin: 167.94,
          }}
          id="el6g6qavaukom"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M179.49 200.78s-2-3.49-5.4-1.36a9.7 9.7 0 00-4.43 9.76 6.33 6.33 0 003.9 4.61z"
          style={{
            WebkitTransformOrigin: 174.513,
            msTransformOrigin: 174.513,
            transformOrigin: 174.513,
          }}
          id="elbpv8yd17dvk"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M201 216s-4.92-3.28-8.9-6.55-10.78-6.33-12.65-8.67-7.49 2.11-7.49 9.13 6.55 20.38 11 23.89 8.67 5.16 10.31 5.16 3-4.92 4-9.61S201 216 201 216z"
          style={{
            WebkitTransformOrigin: 186.48,
            msTransformOrigin: 186.48,
            transformOrigin: 186.48,
          }}
          id="elocx96l3i7ch"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M176.84 201.54s12.81 9.15 15.74 14.64"
          style={{
            WebkitTransformOrigin: 184.71,
            msTransformOrigin: 184.71,
            transformOrigin: 184.71,
          }}
          id="eltw48fz8qbt"
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M198.93 215.77s-8.2 4.45-10.07 13.58 3.75 12.89 8.9 13.59c5.52.75 15.22-7.73 15.22-7.73s-15.92 1.87-14.05-19.44z"
          style={{
            WebkitTransformOrigin: 200.736,
            msTransformOrigin: 200.736,
            transformOrigin: 200.736,
          }}
          id="elbsw406sxqk7"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M228.21 180.17s-13.59 4.68-19.21 12.41-4.45 17.1-4.45 17.1a29.44 29.44 0 00-9.37 14.32c-2.57 9.13-.46 14.05 11.95 14.75s25.06-21.08 25.06-21.08 1.17 13.59 2.81 19.21 4.92 7.49 13.59 9.13 21.78 1.17 36.54-1.64 15.22-9.36 16.16-15.92 4.61-27.67-2.33-49c-4.49-13.81-17.35-18.44-21.56-18.67s-29.98 4.16-49.19 19.39z"
          style={{
            WebkitTransformOrigin: 248.658,
            msTransformOrigin: 248.658,
            transformOrigin: 248.658,
          }}
          id="el4ypppd4nuk5"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <ellipse
          cx="219.1"
          cy="203.78"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          rx="17.3"
          ry="18.23"
          style={{
            WebkitTransformOrigin: 219.1,
            msTransformOrigin: 219.1,
            transformOrigin: 219.1,
          }}
          id="el7drztaqldrh"
          className="animable"
        ></ellipse>
        <path
          d="M231 212.14a14.09 14.09 0 01-11.88 6.7 13.73 13.73 0 01-3.71-.51"
          style={{
            WebkitTransformOrigin: 223.205,
            msTransformOrigin: 223.205,
            transformOrigin: 223.205,
          }}
          id="el66vxi08ak8x"
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M233.38 203.78a16.13 16.13 0 01-.62 4.43"
          style={{
            WebkitTransformOrigin: 233.07,
            msTransformOrigin: 233.07,
            transformOrigin: 233.07,
          }}
          id="eli1ohfnnre2"
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M172.93 184.85a4.5 4.5 0 01.54-1.54 7.08 7.08 0 00-5.2.72 4.09 4.09 0 00-.51.4 24.38 24.38 0 00.19 3.34.72.72 0 00.05-.21 3 3 0 011.28-2 5.31 5.31 0 013.69-.47 1.18 1.18 0 01-.04-.24z"
          style={{
            WebkitTransformOrigin: 170.614,
            msTransformOrigin: 170.614,
            transformOrigin: 170.614,
          }}
          id="eltxu20jc0wso"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M163.31 212.1a4.35 4.35 0 01-1.49-2.64 1 1 0 00-.8-.8s-.77-.15-1.43-1.54a3.79 3.79 0 01.24-3.16.93.93 0 00-.32-1.26c-.53-.32-1.89-1.42-1.89-2.67a2.83 2.83 0 011.47-2.27.92.92 0 00.49-.84s-.06-3.5 1.17-5.48c1.1-1.76 2.18-2 2.26-2a.91.91 0 00.42-.2l-2.38-.85a7.52 7.52 0 00-1.86 2.08 12 12 0 00-1.41 5.27c.35.38.6.67.6.93 0 .71-2.55 2.94-1.66 4.54a10.83 10.83 0 002.12 2.66s-.88 2.48-.53 3.72 2.31 2.48 2.31 2.48-.36 1.24 3 2.66a9.85 9.85 0 001.45.47 18.18 18.18 0 01-1.76-1.1z"
          style={{
            WebkitTransformOrigin: 160.801,
            msTransformOrigin: 160.801,
            transformOrigin: 160.801,
          }}
          id="el9zfkw9lx95w"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M212 221.66l-7.25 7.24"
          style={{
            WebkitTransformOrigin: 208.375,
            msTransformOrigin: 208.375,
            transformOrigin: 208.375,
          }}
          id="elvx9yihxg3"
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 199.795,
            msTransformOrigin: 199.795,
            transformOrigin: 199.795,
          }}
          id="el472hcd2eqxj"
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M202.38 231.32L197.21 234.77"
          className="animable"
        ></path>
        <path
          d="M307.32 340.87s1.95 2.43 0 7.06S298.81 361.31 293 364a61 61 0 01-16.07 4.62c-4.62.73-10.95-.49-10.95-.49s11.2-1.94 15.82-7.05 7.79-15.82 14.85-20.93 10.67.72 10.67.72z"
          style={{
            WebkitTransformOrigin: 287.083,
            msTransformOrigin: 287.083,
            transformOrigin: 287.083,
          }}
          id="elb786wxymicj"
          fill="#263238"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        ></path>
        <path
          d="M274.71 348.66a39 39 0 01-4.13 1c-4.38 1-8.28 2.68-8.76 8.52s.73 9.49 4.13 10 11.2 1.22 18-2.43 13.14-16.3 16.55-20.2 6.81-4.62 6.81-4.62a10.14 10.14 0 00-2.67-5.36 46.85 46.85 0 00-8.52-8c-4.38-3.16-12.41-3.89-15.82 1s-1.7 10.46-1.7 13.87-3.89 6.22-3.89 6.22z"
          style={{
            WebkitTransformOrigin: 284.515,
            msTransformOrigin: 284.515,
            transformOrigin: 284.515,
          }}
          id="elkrv3gw7vdw"
          fill="#E31A50"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M305.26 336.25c-2.41.09-5.38 1.13-8.64 4.86-5.12 5.84-6.09 15.58-16.31 20.69a35.1 35.1 0 01-17.9 3.28 4.31 4.31 0 003.54 3c3.41.49 11.2 1.22 18-2.43s13.14-16.3 16.55-20.2 6.81-4.62 6.81-4.62a9.8 9.8 0 00-2.05-4.58z"
          style={{
            WebkitTransformOrigin: 284.86,
            msTransformOrigin: 284.86,
            transformOrigin: 284.86,
          }}
          id="elsggw8b92ryg"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M299.78 330.65s1.22-1.46-1.7-4.87-23.85-21.17-28.72-22.39-14.36 1.95-19 10.47-1 15.08 2.43 20.44 22.88 17.28 27.5 20.2 6.81-1.46 6.81-5.84-6.32-10.71-3.65-15.58 7.79-6.57 11-5.6a14.46 14.46 0 015.33 3.17z"
          style={{
            WebkitTransformOrigin: 274.099,
            msTransformOrigin: 274.099,
            transformOrigin: 274.099,
          }}
          id="elp75jxq7a7c"
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M243.3 220.51s5.5 17.07 10.71 21.12 9 4.06 9 4.06l2.81 8.15a3.74 3.74 0 002.22 2.31c1.46.54 4.31.09 8.22-1 5.27-1.42 6.4-3.56 6.84-5.17a3.71 3.71 0 000-1.9l-5-18.64z"
          style={{
            WebkitTransformOrigin: 263.262,
            msTransformOrigin: 263.262,
            transformOrigin: 263.262,
          }}
          id="elpgnkpp9nu1l"
          fill="#E31A50"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        ></path>
        <path
          d="M283.07 250a3.71 3.71 0 000-1.9l-1.67-6.22a17.56 17.56 0 00-17.85 5.34l2.27 6.6a3.74 3.74 0 002.22 2.31c1.46.54 4.31.09 8.22-1 5.24-1.36 6.37-3.5 6.81-5.13z"
          style={{
            WebkitTransformOrigin: 273.372,
            msTransformOrigin: 273.372,
            transformOrigin: 273.372,
          }}
          id="elv8nemzi1p"
          fill="#E31A50"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        ></path>
        <path
          d="M283.25 249.63c.58 1.79-2.64 4.44-7.2 5.93s-8.72 1.24-9.3-.54 2.63-4.45 7.19-5.93 8.73-1.25 9.31.54z"
          style={{
            WebkitTransformOrigin: 275,
            msTransformOrigin: 275,
            transformOrigin: 275,
          }}
          id="el3j0e8e90frm"
          fill="#263238"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 266.455,
            msTransformOrigin: 266.455,
            transformOrigin: 266.455,
          }}
          id="elrrwz6peast"
          fill="#E31A50"
          stroke="#263238"
          strokeMiterlimit="10"
          strokeWidth="0.5"
          d="M265.39 245.97L267.52 252.2"
          className="animable"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 269.57,
            msTransformOrigin: 269.57,
            transformOrigin: 269.57,
          }}
          id="elqvhwtber1c"
          fill="#E31A50"
          stroke="#263238"
          strokeMiterlimit="10"
          strokeWidth="0.5"
          d="M268.34 243.68L270.8 250.4"
          className="animable"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 273.825,
            msTransformOrigin: 273.825,
            transformOrigin: 273.825,
          }}
          id="el2i3zw4zt61h"
          fill="#E31A50"
          stroke="#263238"
          strokeMiterlimit="10"
          strokeWidth="0.5"
          d="M272.76 242.21L274.89 248.92"
          className="animable"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 278.74,
            msTransformOrigin: 278.74,
            transformOrigin: 278.74,
          }}
          id="elb3el2amx1o7"
          fill="#E31A50"
          stroke="#263238"
          strokeMiterlimit="10"
          strokeWidth="0.5"
          d="M277.84 241.72L279.64 247.78"
          className="animable"
        ></path>
        <path
          d="M306.55 202.15s4.42 17.39 2.16 23.59-5.45 8.2-5.45 8.2l2 8.39a3.74 3.74 0 01-.66 3.14c-.95 1.24-3.6 2.37-7.47 3.56-5.22 1.6-7.31.38-8.54-.75a3.71 3.71 0 01-1-1.63l-5.69-18.45z"
          style={{
            WebkitTransformOrigin: 295.627,
            msTransformOrigin: 295.627,
            transformOrigin: 295.627,
          }}
          id="el3w7buaikccs"
          fill="#E31A50"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        ></path>
        <path
          d="M288.55 248.28a3.71 3.71 0 01-1-1.63l-1.89-6.15a17.58 17.58 0 0118-5l1.59 6.8a3.74 3.74 0 01-.66 3.14c-.95 1.24-3.6 2.37-7.47 3.56-5.25 1.63-7.34.41-8.57-.72z"
          style={{
            WebkitTransformOrigin: 295.507,
            msTransformOrigin: 295.507,
            transformOrigin: 295.507,
          }}
          id="elvbroxjjbksp"
          fill="#E31A50"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        ></path>
        <path
          d="M288.19 248.05c.45 1.82 4.59 2.36 9.24 1.19s8.06-3.58 7.6-5.4-4.59-2.36-9.24-1.2-8.06 3.58-7.6 5.41z"
          style={{
            WebkitTransformOrigin: 296.61,
            msTransformOrigin: 296.61,
            transformOrigin: 296.61,
          }}
          id="el99g0opbnk4o"
          fill="#263238"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 302.13,
            msTransformOrigin: 302.13,
            transformOrigin: 302.13,
          }}
          id="elpcilxwffbyo"
          fill="#E31A50"
          stroke="#263238"
          strokeMiterlimit="10"
          strokeWidth="0.5"
          d="M301.38 235.46L302.88 241.86"
          className="animable"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 298.405,
            msTransformOrigin: 298.405,
            transformOrigin: 298.405,
          }}
          id="elu5dicono4zh"
          fill="#E31A50"
          stroke="#263238"
          strokeMiterlimit="10"
          strokeWidth="0.5"
          d="M297.66 235.08L299.15 242.08"
          className="animable"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 294.015,
            msTransformOrigin: 294.015,
            transformOrigin: 294.015,
          }}
          id="elbrwsp2lblpd"
          fill="#E31A50"
          stroke="#263238"
          strokeMiterlimit="10"
          strokeWidth="0.5"
          d="M293.13 236.18L294.9 243"
          className="animable"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 289.415,
            msTransformOrigin: 289.415,
            transformOrigin: 289.415,
          }}
          id="elctvfzr2fhdt"
          fill="#E31A50"
          stroke="#263238"
          strokeMiterlimit="10"
          strokeWidth="0.5"
          d="M288.57 238.47L290.26 244.56"
          className="animable"
        ></path>
        <ellipse
          cx="272.59"
          cy="198.18"
          fill="#E31A50"
          stroke="#263238"
          strokeMiterlimit="10"
          rx="38.06"
          ry="37.83"
          style={{
            WebkitTransformOrigin: 272.59,
            msTransformOrigin: 272.59,
            transformOrigin: 272.59,
          }}
          id="elt9lvwy0di5i"
          className="animable"
        ></ellipse>
        <ellipse
          id="ela2nz5vzdm3"
          cx="275.35"
          cy="195.83"
          fill="#263238"
          stroke="#263238"
          strokeMiterlimit="10"
          rx="34.37"
          ry="32.34"
          style={{
            WebkitTransformOrigin: 275.35,
            msTransformOrigin: 275.35,
            transformOrigin: 275.35,
          }}
          className="animable"
          transform="rotate(-4.25)"
        ></ellipse>
        <path
          d="M245.82 185.26a30.27 30.27 0 018.36-11.43"
          style={{
            WebkitTransformOrigin: 250,
            msTransformOrigin: 250,
            transformOrigin: 250,
          }}
          id="elbx1zxw4bbja"
          fill="none"
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.5"
          className="animable"
        ></path>
        <path
          d="M244.31 202.08a29.3 29.3 0 01-.56-3.9 28.23 28.23 0 01.54-8"
          style={{
            WebkitTransformOrigin: 243.99,
            msTransformOrigin: 243.99,
            transformOrigin: 243.99,
          }}
          id="el9bwn03rd92n"
          fill="none"
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.5"
          className="animable"
        ></path>
        <path
          d="M298.72 178.16c-7.37-4.52-17.42-5.95-26.9-3.83s-18.14 7.83-22.82 15.17a2.52 2.52 0 104.24 2.72c4-6.25 11.35-11.1 19.69-13s16.89-.65 23.16 3.2a2.52 2.52 0 102.64-4.29z"
          style={{
            WebkitTransformOrigin: 274.279,
            msTransformOrigin: 274.279,
            transformOrigin: 274.279,
          }}
          id="el2fsoo5ogsrl"
          fill="#FFF"
          className="animable"
        ></path>
        <path
          d="M293.6 186.78a29.64 29.64 0 00-36.25 8.22 2.51 2.51 0 00.49 3.52 2.52 2.52 0 003.53-.49 24.59 24.59 0 0129.92-6.78 2.52 2.52 0 102.31-4.48z"
          style={{
            WebkitTransformOrigin: 275.903,
            msTransformOrigin: 275.903,
            transformOrigin: 275.903,
          }}
          id="elsw1ofw25q4"
          fill="#FFF"
          className="animable"
        ></path>
        <path
          d="M288.42 195.33a18.32 18.32 0 00-22.95 5.46 2.52 2.52 0 002.55 4 2.46 2.46 0 001.44-.92 13.32 13.32 0 0116.77-4 2.52 2.52 0 002.19-4.53z"
          style={{
            WebkitTransformOrigin: 277.329,
            msTransformOrigin: 277.329,
            transformOrigin: 277.329,
          }}
          id="elf4t6vjysaur"
          fill="#FFF"
          className="animable"
        ></path>
        <circle
          cx="279.46"
          cy="208.4"
          r="6.04"
          style={{
            WebkitTransformOrigin: 279.46,
            msTransformOrigin: 279.46,
            transformOrigin: 279.46,
          }}
          id="elqj3q5pwfte"
          fill="#FFF"
          className="animable"
          transform="rotate(-57.27)"
        ></circle>
        <path
          d="M240.35 264.44a88.84 88.84 0 00-.6 18.16"
          style={{
            WebkitTransformOrigin: 239.943,
            msTransformOrigin: 239.943,
            transformOrigin: 239.943,
          }}
          id="elq7ulxocis"
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M240.35 285.88a36.31 36.31 0 001.48 9.53"
          style={{
            WebkitTransformOrigin: 241.09,
            msTransformOrigin: 241.09,
            transformOrigin: 241.09,
          }}
          id="el5d1esjvy2k9"
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M250.17 317.75s2.09 5.06 11.62 13.7 21.45 18.17 21.45 18.17"
          style={{
            WebkitTransformOrigin: 266.705,
            msTransformOrigin: 266.705,
            transformOrigin: 266.705,
          }}
          id="el2jl1kjv2xqk"
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
        <path
          d="M240.35 245.37s-1.79 8.64-.3 13.11"
          style={{
            WebkitTransformOrigin: 239.904,
            msTransformOrigin: 239.904,
            transformOrigin: 239.904,
          }}
          id="elixbg4bcbk7g"
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        ></path>
      </g>
      <defs>
        <filter id="active" height="200%">
          <feMorphology
            in="SourceAlpha"
            operator="dilate"
            radius="2"
            result="DILATED"
          ></feMorphology>
          <feFlood
            floodColor="#32DFEC"
            floodOpacity="1"
            result="PINK"
          ></feFlood>
          <feComposite
            in="PINK"
            in2="DILATED"
            operator="in"
            result="OUTLINE"
          ></feComposite>
          <feMerge>
            <feMergeNode in="OUTLINE"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
        <filter id="hover" height="200%">
          <feMorphology
            in="SourceAlpha"
            operator="dilate"
            radius="2"
            result="DILATED"
          ></feMorphology>
          <feFlood floodColor="red" floodOpacity="0.5" result="PINK"></feFlood>
          <feComposite
            in="PINK"
            in2="DILATED"
            operator="in"
            result="OUTLINE"
          ></feComposite>
          <feMerge>
            <feMergeNode in="OUTLINE"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
          <feColorMatrix values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"></feColorMatrix>
        </filter>
      </defs>
    </svg>
  );
}
