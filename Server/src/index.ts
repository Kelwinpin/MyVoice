import express from "express";
import db from "./database/config/database.js";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();

// Enable CORS for requests from your frontend (localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // If you need to allow cookies or authorization headers
}));

// Use the routes
app.use(routes);

// Start the server
app.listen(3000, () => {
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
