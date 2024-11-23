import express from "express";
import db from "./database/config/database.js";
import routes from "./routes/index.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Enable CORS for requests from your frontend (localhost:5173)
app.use(cors({
  origin: '*', // Permite todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true, // Se precisar permitir cookies ou cabeçalhos de autorização
}));

// Use the routes
app.use(routes);

const port = process.env.PORT || 3000;

// Start the server
app.listen(Number(port), "0.0.0.0" ,() => {
  console.log("Server is running on port 3000");
});

// Authenticate and sync the database
try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
  db.sync({ force: false }).then(() => {
    console.log("Banco de dados sincronizado.");
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
