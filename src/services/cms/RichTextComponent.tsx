import { RichTextContent } from "./types";

interface Props {
  content: RichTextContent;
  className?: string;
  contentFullFieldProps?: any;
}

export default function RichTextComponent(props: Props) {
  const { content, className, contentFullFieldProps } = props;
  return (
    <div className={className} {...contentFullFieldProps}>
      {content.content.map((paragraph, index) => (
        <p key={index}>
          {paragraph.content.map((text, index) => (
            <span key={index} style={text.marks.some((mark) => mark.type === "bold") ? { fontWeight: "bold", whiteSpace: "pre-line" } : { whiteSpace: "pre-line" }}>
              {text.value}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
