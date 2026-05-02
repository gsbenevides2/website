import { useEffect, useId, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({ startOnLoad: false, theme: "default" });

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart);
        if (ref.current) {
          ref.current.innerHTML = svg;
          setError(null);
        }
      } catch {
        setError("Diagrama inválido");
      }
    }

    render();
  }, [chart, id]);

  if (error) {
    return (
      <pre style={{ color: "red", padding: "8px", border: "1px solid red", borderRadius: "4px" }}>
        {error}: {chart}
      </pre>
    );
  }

  return <div ref={ref} style={{ textAlign: "center", margin: "1em 0" }} />;
}
