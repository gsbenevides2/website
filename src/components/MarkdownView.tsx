import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface MarkdownViewProps {
  text: string
}
interface CodeBlockProps {
  language: string | null
  value: string
}
const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={dracula}>
      {value}
    </SyntaxHighlighter>
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
