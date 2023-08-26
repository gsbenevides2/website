import {
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import styles from "./styles.module.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

interface InputProps<T>
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "ref"
  > {
  boxClassName?: string;
  label?: string;
  state?: T;
  setState?: (value: T) => void;
  ref?: (instance: HTMLInputElement | null) => void;
}

export default function Input<T>(props: InputProps<T>) {
  const {
    label,
    state,
    setState,
    boxClassName,
    className: propClassName,
    onChange: propOnChange,
    ref: propRef,
    ...rest
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  const className = [styles.input, nunito.className, propClassName].join(" ");
  const divClassName = [nunito.className, boxClassName].join(" ");
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (propOnChange) propOnChange(e);
      if (setState) setState(e.target.value as T);
    },
    [setState, propOnChange]
  );

  useEffect(() => {
    if (propRef) propRef(ref.current);
  }, [propRef]);

  useEffect(() => {
    if (ref.current) ref.current.value = String(state);
  }, [state, ref]);

  return (
    <div className={divClassName}>
      <label htmlFor={props.id}>{label}</label>
      <input {...rest} className={className} onChange={onChange} ref={ref} />
    </div>
  );
}
