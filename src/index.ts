import express from 'express';
import Router from './routes';

const routes = new Router().listen;

const app = express();

app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});