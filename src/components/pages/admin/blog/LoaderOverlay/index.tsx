import classNames from "classnames";
import Loader from "@/components/Loader";
import styles from "./styles.module.scss";

interface LoaderOverlayProps {
  isLoading: boolean;
}

export function LoaderOverlay({ isLoading }: LoaderOverlayProps) {
  return (
    <div
      className={classNames(styles.loader, styles.update, {
        [styles.show]: isLoading,
      })}
    >
      <Loader />
      <span>Estamos fazendo algumas operações aguarde</span>
    </div>
  );
}
