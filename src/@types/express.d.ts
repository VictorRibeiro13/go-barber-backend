/**
 *  Override no método de Request para atribuir um objeto user e passarmos essa
 *  informação pela requisição.
 */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
