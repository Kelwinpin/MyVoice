import db from "./database/config/database.js";
import routes from "./routes/index.js";

routes.listen(3000, () => {
  console.log("Server is running on port 3000");
});

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
  db.sync({ force: false }).then(() => {
      console.log("Banco de dados sincronizado.");
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}