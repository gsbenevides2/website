import React, {
  ButtonHTMLAttributes,
  DOMAttributes,
  DetailedHTMLProps,
} from "react";
import styles from "./styles.module.scss";
import { Nunito } from "next/font/google";
import Link from "next/link";
import classNames from "classnames";

const nunito = Nunito({ subsets: ["latin"] });

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<Props> = (props) => {
  const { className, type, ...rest } = props;

  return (
    <button
      {...rest}
      type={type || "button"}
      className={classNames(styles.button, className, nunito.className)}
    />
  );
};

type PropsSSRLink = React.ComponentProps<typeof Link>;

export const ButtonSSRLink = (props: PropsSSRLink) => {
  const { className, ...rest } = props;
  return (
    <Link
      className={classNames(styles.button, className, nunito.className)}
      {...rest}
    />
  );
};
