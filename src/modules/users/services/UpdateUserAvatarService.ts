import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '@modules/users/infra/typeorm/entities/User.model';
import configUpload from '@config/upload';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change the avatar', 401);
    }

    if (user.avatar) {
      // DELETANDO AVATAR ANTERIOR DO USUÁRIO

      // join(path até a pasta tmp + nome do arquivo a deletar)
      const userAvatarFilePath = path.join(configUpload.directoryTmp, user.avatar);

      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    // serve para salvar um novo registro no banco, ou atualizá-lo ao final das alterações
    await userRepository.save(user);

    return user;
  }
}
