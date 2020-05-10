import 'reflect-metadata';

import express, {
  Request, Response, NextFunction, response,
} from 'express';
import 'express-async-errors';

import routes from './routes/index';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());

// ao acessar essa rota, retornará o arquivo estatico, no caso, a imagem.
app.use('/files', express.static(uploadConfig.directoryTmp));

app.use(routes);

// central error handling
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  // verificando se o erro foi instaciado pela aplicação
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  // caso seja um erro desconhecido (não gerado pela aplicação)
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});


app.listen(3333, () => {
  console.log('Server started !');
});
