import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import ensureAuth from '../middlewares/ensureAuth';

const usersRouter = Router();

/**
 * Store Users: name, email, password
 */
usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const userService = new CreateUserService();

    const user = await userService.execute({
      name, email, password,
    });

    // deleting passoword from response
    delete user.password;

    return response.status(200).json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// patch altera somente uma informação do usuário
usersRouter.patch('/avatar', ensureAuth, async (request, response) => response.json({ ok: true }));


export default usersRouter;
