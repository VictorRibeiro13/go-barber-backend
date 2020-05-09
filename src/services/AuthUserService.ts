import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User.model';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

export default class AuthUserService {
  public async execute({ email, password }: Request): Promise<{ user: User; token: string }> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email / password');
    }

    // user.password = senha criptografada
    // password - senha não criptograda

    // compare -> compara senhas não criptgrafadas com criptografadas
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email / password');
    }

    // User Authenticated
    const token = sign({ }, authConfig.jwt.secret, {
      subject: user.id, // id do usuário que gera o token
      expiresIn: authConfig.jwt.expiresIn, // tempo de expiração do token
    });

    return {
      user,
      token,
    };
  }
}
