type Readers<T> = { [key: string]: (element: HTMLInputElement) => T[keyof T] };

const readers: Readers<any> = {
  checkbox: (element) => element.checked,
  number: (element) => element.valueAsNumber,
  date: (element) => element.valueAsDate,
  select: (element) => element.value,
  text: (element) => element.value,
  email: (element) => element.value,
  color: (element) => element.value,
  "datetime-local": (element) => element.value,
  hidden: (element) => element.valueAsDate,
  file: (element) => {
    if (element.files) {
      if (element.files.length === 1) return element.files[0];
      else if (element.files.length > 1) return element.files;
      else return null;
    } else return null;
  },
  tel: (element) => element.value,
  time: (element) => element.valueAsDate,
  password: (element) => element.value,
  radio: (element) => element.value,
  url: (element) => (element.value ? new URL(element.value) : null),
};

export function fetchInputsFromForm<T>(
  form: HTMLFormElement,
  inputs: string[]
): T {
  const values: T = {} as T;
  for (const input of inputs) {
    console.log(form.elements);
    const element = form.elements.namedItem(input);
    if (element instanceof HTMLInputElement) {
      const key = element.name as keyof T;
      const type = element.type;
      const reader = readers[type] as (element: HTMLInputElement) => T[keyof T];
      if (reader) values[key] = reader(element);
      else throw new Error(`Type ${type} not supported`);
    } else if (element instanceof HTMLTextAreaElement) {
      const key = element.name as keyof T;
      values[key] = element.value as T[keyof T];
    } else {
      throw new Error(`Element ${input} not found`);
    }
  }
  return values;
}
