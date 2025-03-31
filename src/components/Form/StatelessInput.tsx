import React from "react";
import { FormContext } from ".";

interface CustomInputProps<T> {
  state: any;
  setState: (value: any) => void;
}
interface StatelessInputProps<T> {
  name: string;
  customComponent: (props: CustomInputProps<T>) => React.ReactNode;
  initialState?: any;
}

export default function StatelessInput<T>(props: StatelessInputProps<T>) {
  const context = React.useContext(FormContext);
  const [stateA, setStateA] = React.useState<any>(props.initialState);
  const state = React.useRef<any>(props.initialState);

  const setState = (value: any) => {
    if (value instanceof Function) value = value(state.current);
    state.current = value;
    setStateA(value);
  };

  React.useEffect(() => {
    context.addStateInput(props.name, () => state.current, setState);
  }, [context, props.name]);

  return props.customComponent({ state: stateA, setState });
}
