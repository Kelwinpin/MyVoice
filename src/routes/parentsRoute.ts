import express from "express";

const parentsRoute = express();

parentsRoute.get('/', (req, res) => {
  res.send('GET Parents');
});

export default parentsRoute;