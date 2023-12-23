import React from "react";
import { InputProps } from "./types";
import { FormContext } from ".";

export default function Input(props: InputProps) {
  const context = React.useContext(FormContext);
  React.useEffect(() => {
    context.addSimpleInput(props.name);
  }, [context, props.name]);

  if (props.customComponent) return props.customComponent(props);
  else return <input {...props} />;
}
