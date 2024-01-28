import React from "react";
import { InputProps } from "./types";
import { FormContext } from ".";

export default function Input(props: InputProps) {
  const { customComponent, ...rest } = props;
  const context = React.useContext(FormContext);
  React.useEffect(() => {
    context.addSimpleInput(props.name);
  }, [context, props.name]);

  if (customComponent) return customComponent(rest);
  else return <input {...rest} />;
}
