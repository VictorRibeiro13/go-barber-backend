import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(request: Request, response: Response, next: NextFunction): void {
  // validar token jwt
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // token example:  Bearer asdui12oij3810
  const [, token] = authHeader.split(' ');

  try {
    // verify ( token, secret )
    const decoded = verify(token, authConfig.jwt.secret);

    // forçando o tipo TokenPayload in decoded
    const { sub } = decoded as TokenPayload;

    /**
     *  passando o id do usuário para o request ( que sobreescrevemos para
     *  atribuir o objeto 'user') para podermos utilziar nos próximos middlewares
     * */
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    // mandando a nossa resposta de erro
    throw new AppError('Invalid JWT token', 401);
  }
}
