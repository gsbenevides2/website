import React from "react";
import { TextAreaProps } from "./types";
import { FormContext } from ".";

export default function TextArea(props: TextAreaProps) {
  const context = React.useContext(FormContext);
  React.useEffect(() => {
    context.addSimpleInput(props.name);
  }, [context, props.name]);

  if (props.customComponent) return props.customComponent(props);
  else return <textarea {...props} />;
}