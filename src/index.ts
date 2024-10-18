import routes from "./routes/index.js";

routes.listen(3000, () => {
  console.log("Server is running on port 3000");
});