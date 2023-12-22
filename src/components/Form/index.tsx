import React, { FormEventHandler, createRef, useCallback, useRef } from "react";
import { fetchInputsFromForm } from "./utils/fetchInputsFromForm";
import { FormContextData, FormProps, InputSystem } from "./types";
import InputImported from "./Input";
import TextareaImported from "./TextArea";
import StatelessInputImported from "./StatelessInput";

const defaultValues: FormContextData = {
  inputs: [],
  addSimpleInput: () => {},
  addStateInput: () => {},
};
export const FormContext = React.createContext<FormContextData>(defaultValues);

export function Form<T>(props: FormProps<T>) {
  const [inputs, setInputs] = React.useState<InputSystem[]>([]);
  const formNode = React.useRef<HTMLFormElement>(null);

  const addSimpleInput = useCallback((inputName: string) => {
    setInputs((inputs) => {
      const hasInput = inputs.findIndex((input) => input.name === inputName);
      return hasInput !== -1 ? inputs : [...inputs, { name: inputName }];
    });
  }, []);

  const addStateInput = useCallback(
    (
      inputName: string,
      retriveStateValue: () => any,
      changeStateValue: (v: any) => void
    ) => {
      setInputs((inputs) => {
        const hasInput = inputs.findIndex((input) => input.name === inputName);
        if (hasInput !== -1) return inputs;
        const oldElements = [
          ...inputs.slice(0, hasInput),
          ...inputs.slice(hasInput + 1),
        ];
        oldElements.push({
          name: inputName,
          retriveStateValue,
          changeStateValue,
        });
        return oldElements;
      });
    },

    []
  );

  const value = React.useMemo(
    () => ({ inputs, addSimpleInput, addStateInput, formNode }),
    [inputs, addSimpleInput, addStateInput]
  );

  React.useEffect(() => {
    if (props.contextLoader) props.contextLoader(value);
  }, [props, props.contextLoader, value]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      const notStateInputsNames = inputs
        .filter((input) => !input.retriveStateValue)
        .map((input) => input.name);
      const stateInputs = inputs.filter((input) => input.retriveStateValue);

      const values = {
        ...fetchInputsFromForm<T>(event.currentTarget, notStateInputsNames),
      };

      console.log("stateInputs", stateInputs);

      stateInputs.forEach((input) => {
        const key = input.name as keyof T;
        const value = input.retriveStateValue?.() as T[keyof T];
        console.log("key", key);
        console.log("value", value);
        values[key] = value;
      });

      props.submit(values);
    },
    [inputs, props]
  );

  return (
    <FormContext.Provider value={value}>
      <form className={props.className} onSubmit={handleSubmit} ref={formNode}>
        {props.children}
      </form>
    </FormContext.Provider>
  );
}

export const Input = InputImported;
export const Textarea = TextareaImported;
export const StatelessInput = StatelessInputImported;

export const useFormContext = () => {
  const contextRef = useRef<FormContextData>();

  const changeInputValue = useCallback((name: string, value: string) => {
    const context = contextRef.current;
    if (!context) return;
    console.log("context", context);
    if (!context.formNode?.current) return;
    const findedInput = context.inputs.find((input) => input.name === name);
    console.log("findedInput", findedInput);
    if (!findedInput) return;

    if (findedInput.changeStateValue) {
      findedInput.changeStateValue(value);
    } else {
      const input = context.formNode.current.querySelector(`[name="${name}"]`);
      if (!input) return;

      (input as HTMLInputElement).value = value;
    }
  }, []);

  const changeMultipleInputValues = useCallback(
    (values: any) => {
      console.log("values", values);
      const keys = Object.keys(values);
      keys.forEach((key) => {
        changeInputValue(key, values[key]);
      });
    },
    [changeInputValue]
  );

  const contextLoader = useCallback((contextReceived: FormContextData) => {
    console.log("contextReceived", contextReceived);
    contextRef.current = contextReceived;
  }, []);
  return { changeInputValue, changeMultipleInputValues, contextLoader };
};
