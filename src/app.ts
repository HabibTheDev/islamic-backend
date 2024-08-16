import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalError from './app/middlewares/globalError';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://1ummah.netlify.app'],
    credentials: true,
  }),
);

app.use('/api', router);

app.use(globalError);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world, running');
});

export default app;
