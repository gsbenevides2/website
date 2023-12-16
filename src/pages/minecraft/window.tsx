import styles from './styles.module.css'

interface Props {
    transparent?: boolean;
    children?: React.ReactNode;
}

export default function Window(props: Props) {
    const classNames = [styles.window]
    if (props.transparent) {
        classNames.push(styles.transparent)
    }
    return (
        <div className={classNames.join(" ")}>
            <div className={styles.windowContent}>
                <div className={styles.windowInsider}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}