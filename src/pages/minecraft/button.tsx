import styles from "./styles.module.css";

interface MinecraftButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  small?: boolean;
}

export default function MinecraftButton(props: MinecraftButtonProps) {
  const classNames = [styles.button];
  if (props.small) {
    classNames.push(styles.small);
  }
  return (
    <button className={classNames.join(" ")} onClick={props.onClick}>
      <div className={styles.buttonInsider}>{props.children}</div>
    </button>
  );
}
