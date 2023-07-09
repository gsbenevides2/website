import {MouseEventHandler} from "react"
import {IconType} from "react-icons/lib"
import styles from './styles.module.css'

interface Props {
	icon: IconType
	size: number
	onClick?: MouseEventHandler<HTMLButtonElement>
	className?: string
}
export default function IconButton(props: Props) {
	const className = [styles.container, props.className].join(" ")
	return (
		<button className={className} onClick={props.onClick}>
			<props.icon size={props.size} />
		</button >
	)
}
