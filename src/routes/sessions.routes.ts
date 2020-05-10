import { Router } from 'express';

import AuthUserService from '../services/AuthUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authUser = new AuthUserService();

  const { user, token } = await authUser.execute({
    email, password,
  });

  delete user.password;

  return response.status(200).json({ user, token });
});


export default sessionsRouter;
