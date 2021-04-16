import React from 'react'
import { FiCopy } from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

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
        <FiCopy /> &emsp; Copiar para Area de Transferencia
      </CopyToClipabord>
    </>
  )
}
const MarkdownView: React.FC<MarkdownViewProps> = ({ text }) => {
  return (
    <ReactMarkdown
      renderers={{
        code: CodeBlock
      }}
      source={text}
    />
  )
}

export default MarkdownView
