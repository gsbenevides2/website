import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import style from "./style.module.scss";
type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export default function Toogle(props: Props) {
  return (
    <label className={style.switch}>
      <input {...props} type="checkbox" />
      <span />
    </label>
  );
}
