import express from 'express';

const routes = express();

routes.get('/', (req, res) => {
  res.send('Hello World!');
});

routes.post('/', (req, res) => {
  res.send('POST');
});

export default routes;