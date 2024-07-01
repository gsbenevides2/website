import classNames from "classnames";
import { Nunito_Sans } from "next/font/google";
import Link from "next/link";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./styles.module.scss";

const nunito = Nunito_Sans({ subsets: ["latin"] });

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: React.FC<Props> = (props) => {
  const { className, type, ...rest } = props;

  return <button {...rest} type={type || "button"} className={classNames(styles.button, className, nunito.className)} />;
};

type PropsSSRLink = React.ComponentProps<typeof Link>;

export const ButtonSSRLink = (props: PropsSSRLink) => {
  const { className, ...rest } = props;
  return <Link className={classNames(styles.button, className, nunito.className)} {...rest} />;
};

type PropsAnchor = React.HTMLProps<HTMLAnchorElement>;
export const ButtonAnchor = (props: PropsAnchor) => {
  const { className, ...rest } = props;
  return <a {...rest} className={classNames(styles.button, className, nunito.className)} />;
};
