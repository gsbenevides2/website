import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import NextImage from 'next/image'
import styled from 'styled-components'
const CopyToClipabord = styled.span`
  display: inline-block;
  background-color: #282a36;
  color: #f8f8f2;
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  line-height: 1.5;
  margin-top: -12.8px;
  width: 100%;
  text-align: center;
  padding: 16px;
  font-size: 14px;
  border-top: 1px solid #f8f8f2;
  margin-bottom: 8px;
  border-radius: 0px 0px 4.8px 4.8px;
  transition: 0.2s;
  &:hover {
    background-color: #44475a;
  }
`

interface MarkdownViewProps {
  text: string
}
interface CodeBlockProps {
  language: string | null
  value: string
}

const Icon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="1em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="#f8f8f2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </g>
  </svg>
)

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  function copyToClipabord() {
    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(value)
    } else {
      alert('Não foi possivel acessar a Area de Transferencia')
    }
  }
  return (
    <>
      <SyntaxHighlighter language={language} style={dracula}>
        {value}
      </SyntaxHighlighter>
      <CopyToClipabord onClick={copyToClipabord}>
        <Icon /> &emsp; Copiar para Area de Transferencia
      </CopyToClipabord>
    </>
  )
}
interface ImageProps {
  alt: string
  src: string
}
const Image: React.FC<ImageProps> = props => {
  return (
    <NextImage
      layout="fixed"
      alt={props.alt}
      src={props.src}
      width=""
      height=""
      className="next"
    />
  )
}

const MarkdownView: React.FC<MarkdownViewProps> = ({ text }) => {
  return (
    <ReactMarkdown
      renderers={{
        code: CodeBlock,
        image: Image
      }}
      source={text}
    />
  )
}

export default MarkdownView
