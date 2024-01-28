import React from "react";
import { TextAreaProps } from "./types";
import { FormContext } from ".";

export default function TextArea(props: TextAreaProps) {
  const { customComponent, ...rest } = props;
  const context = React.useContext(FormContext);
  React.useEffect(() => {
    context.addSimpleInput(props.name);
  }, [context, props.name]);

  if (customComponent) return customComponent(rest);
  else return <textarea {...rest} />;
}
