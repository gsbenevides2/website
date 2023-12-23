import {
  ChangeEventHandler,
  DetailedHTMLProps,
  FormEventHandler,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import styles from "./styles.module.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

interface TextAreaProps<T>
  extends Omit<
    DetailedHTMLProps<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    "ref"
  > {
  label?: string;
  state?: T;
  setState?: (value: T) => void;
  ref?: (instance: HTMLTextAreaElement | null) => void;
}

export default function TextArea<T>(props: TextAreaProps<T>) {
  const {
    label,
    state,
    setState,
    className: propClassName,
    onChange: propOnChange,
    onInput: propOnInput,
    ref: propRef,
    ...rest
  } = props;

  const ref = useRef<HTMLTextAreaElement>(null);
  const className = [styles.input, nunito.className, propClassName].join(" ");

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      if (propOnChange) propOnChange(e);
      if (setState) setState(e.target.value as T);
    },
    [setState, propOnChange]
  );

  const onInput: FormEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      if (propOnInput) propOnInput(e);
      e.currentTarget.style.height = "auto";
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 8 + "px";
    },
    [propOnInput]
  );

  useEffect(() => {
    if (propRef) propRef(ref.current);
  }, [propRef]);

  useEffect(() => {
    if (ref.current && state) {
      ref.current.value = String(state);
      ref.current.style.height = ref.current.scrollHeight + 8 + "px";
    }
  }, [state, ref]);

  return (
    <div className={nunito.variable}>
      <label htmlFor={props.id}>{label}</label>
      <textarea
        {...rest}
        className={className}
        onChange={onChange}
        onInput={onInput}
        ref={ref}
      />
    </div>
  );
}
