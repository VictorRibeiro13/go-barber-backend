import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import uploadConfig from '@config/upload';
import ensureAuth from '@modules/users/infra/middlewares/ensureAuth';

const usersRouter = Router();
const upload = multer(uploadConfig);

/**
 * Store Users: name, email, password
 */
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const userService = new CreateUserService();

  const user = await userService.execute({
    name, email, password,
  });

  // deleting passoword from response
  delete user.password;

  return response.status(200).json(user);
});

// patch altera somente uma informação do usuário
usersRouter.patch('/avatar', ensureAuth, upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  });


export default usersRouter;
