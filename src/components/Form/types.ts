export interface InputSystem {
  name: string;
  retriveStateValue?: () => any;
  changeStateValue?: (value: any) => void;
}

export interface FormContextData {
  inputs: InputSystem[];
  addSimpleInput: (name: string) => void;
  addStateInput: (
    name: string,
    retriveStateValue: () => any,
    changeStateValue: (v: any) => void
  ) => void;
  formNode?: React.MutableRefObject<HTMLFormElement | null>;
}
type DefaultInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface InputProps extends Omit<DefaultInputProps, "name"> {
  name: string;
  customComponent?: (props: DefaultInputProps) => React.ReactNode;
}

type DefaultTextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export interface TextAreaProps extends Omit<DefaultTextAreaProps, "name"> {
  name: string;
  customComponent?: (props: DefaultTextAreaProps) => React.ReactNode;
}

export type FormSubmitEvent<T> = (e: T) => void;
export interface FormProps<T> {
  className?: string;
  submit: FormSubmitEvent<T>;
  children: React.ReactNode;
  contextLoader?: (context: FormContextData) => void;
}
