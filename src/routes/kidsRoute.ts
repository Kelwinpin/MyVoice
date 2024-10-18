import express from "express";

const kidsRoute = express();

kidsRoute.get('/', (req, res) => {
  res.send('GET Kid');
});

export default kidsRoute;