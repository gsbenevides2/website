import TextArea from "@/components/TextArea";
import styles from "./styles.module.scss";
import { Button } from "@/components/Button";

interface AIModalProps {
  open: boolean;
  description: string;
  isGenerating: boolean;
  onDescriptionChange: (value: string) => void;
  onGenerate: () => void;
  onClose: () => void;
}

export function AIModal({
  open,
  description,
  isGenerating,
  onDescriptionChange,
  onGenerate,
  onClose,
}: AIModalProps) {
  if (!open) return null;

  return (
    <div className={styles.aiModalOverlay} onClick={onClose}>
      <div
        className={styles.aiModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>🎨 Gerar Thumbnail com IA</h2>
        <TextArea
          label="Descrição da imagem: *"
          id="aiDescription"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Ex: Uma paisagem futurista com prédios iluminados à noite, representando tecnologia e inovação..."
          rows={5}
          disabled={isGenerating}
          maxLength={2000}
          className={styles.aiTextarea}
        />
        <small className={styles.aiCharCount}>
          {description.length}/2000 caracteres
        </small>

        <div className={styles.aiModalActions}>
          <Button onClick={onClose} disabled={isGenerating} type="button">
            Cancelar
          </Button>
          <Button
            onClick={onGenerate}
            disabled={isGenerating || !description.trim()}
            type="button"
          >
            {isGenerating ? "⏳ Gerando..." : "✨ Gerar Thumbnail"}
          </Button>
        </div>
      </div>
    </div>
  );
}
