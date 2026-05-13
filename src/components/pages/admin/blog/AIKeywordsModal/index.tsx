import styles from "./styles.module.scss";
import { Button } from "@/components/Button";
import { useState } from "react";
import Input from "@/components/Input";

interface AIKeywordsModalProps {
  open: boolean;
  isGenerating: boolean;
  keywords: string[];
  error: string | null;
  onGenerate: () => void;
  onApply: () => void;
  onRemove: (index: number) => void;
  onAdd: (keyword: string) => void;
  onClose: () => void;
}

export function AIKeywordsModal({
  open,
  isGenerating,
  keywords,
  error,
  onGenerate,
  onApply,
  onRemove,
  onAdd,
  onClose,
}: AIKeywordsModalProps) {
  const [newKeyword, setNewKeyword] = useState("");

  if (!open) return null;

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      onAdd(newKeyword);
      setNewKeyword("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  return (
    <div className={styles.aiModalOverlay} onClick={onClose}>
      <div
        className={styles.aiModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>🔑 Gerar Keywords com IA</h2>
        
        <p className={styles.aiDescription}>
          A IA irá analisar o título, descrição e conteúdo do seu post para
          gerar keywords relevantes para SEO.
        </p>

        {error && (
          <div className={styles.aiErrorMessage}>
            <strong>Erro:</strong> {error}
          </div>
        )}

        {keywords.length === 0 && !isGenerating && (
          <div className={styles.aiEmptyState}>
            <p>Clique no botão abaixo para gerar keywords automaticamente.</p>
          </div>
        )}

        {keywords.length > 0 && (
          <>
            <div className={styles.aiKeywordsContainer}>
              <h3>Keywords geradas ({keywords.length}/10):</h3>
              <div className={styles.aiKeywordsList}>
                {keywords.map((keyword, index) => (
                  <div key={index} className={styles.aiKeywordChip}>
                    <span>{keyword}</span>
                    <button
                      type="button"
                      onClick={() => onRemove(index)}
                      className={styles.aiRemoveButton}
                      aria-label={`Remover keyword ${keyword}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {keywords.length < 10 && (
              <div className={styles.aiAddKeyword}>
                <Input
                  label="Adicionar keyword manualmente:"
                  id="newKeyword"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite uma keyword e pressione Enter"
                  maxLength={50}
                />
                <Button
                  onClick={handleAddKeyword}
                  disabled={!newKeyword.trim()}
                  type="button"
                >
                  Adicionar
                </Button>
              </div>
            )}
          </>
        )}

        <div className={styles.aiModalActions}>
          <Button onClick={onClose} disabled={isGenerating} type="button">
            Cancelar
          </Button>
          
          {keywords.length === 0 ? (
            <Button
              onClick={onGenerate}
              disabled={isGenerating}
              type="button"
            >
              {isGenerating ? "⏳ Gerando..." : "✨ Gerar Keywords"}
            </Button>
          ) : (
            <>
              <Button
                onClick={onGenerate}
                disabled={isGenerating}
                type="button"
              >
                {isGenerating ? "⏳ Regenerando..." : "🔄 Regenerar"}
              </Button>
              <Button
                onClick={onApply}
                disabled={isGenerating}
                type="button"
              >
                ✓ Aplicar Keywords
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
