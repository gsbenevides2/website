export default class MyError extends Error {
    code: string;
    constructor(code: string, messsage?: string, options?: ErrorOptions) {
    super(messsage, options);
    this.code = code;
  }
}