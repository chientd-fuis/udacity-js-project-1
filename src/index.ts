import express, { Response } from 'express';
import routes from './routes';

const app = express();
const port = 3000;

app.use(routes);

app.get('/', (_, res: Response): void => {
  res.status(200).send('Server is running...');
});

app.listen(port, (): void => {
  console.log('listening on port ' + port);
});

export default app;
