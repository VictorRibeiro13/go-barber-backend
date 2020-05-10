export default class Error {
  public readonly message: string;

  public readonly statusCode: number;

  // ao atribuir um valor inicial, entende-se que é um valor padão caso o parametro venha null.
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
