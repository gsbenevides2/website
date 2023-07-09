import React, {
  ButtonHTMLAttributes,
  DOMAttributes,
  DetailedHTMLProps,
} from "react";
import styles from "./styles.module.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <button
      {...rest}
      className={[styles.button, className, nunito.className].join(" ")}
    />
  );
};
