import express from "express";
import terms from "./db/terms.json" assert { type: "json" };

// Start express
const app = express();
const port = 3001;

// gets file from a "database"
app.get("/api", (_, res) => {
  res.json(terms);
});

// start the server
// npm start
app.listen(port, () => {
  console.info("server running on 3001");
});
