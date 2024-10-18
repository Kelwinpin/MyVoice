import express from "express";

const activitiesRoute = express();

activitiesRoute.get('/', (req, res) => {
  res.send('GET Activities');
});

export default activitiesRoute;