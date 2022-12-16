import express from "express";
import termsData from "./db/terms.json" assert { type: "json" };

// Start express
const app = express();
const port = 3001;

// TODO: use query parameters to allow an option to sort the terms either ascending or descending
// gets file from a "database"
app.get("/api/terms", (req, res) => {
  // get the value of the sort query from the request
  const { sort } = req.query;

  let ret;

  switch (sort) {
    case "asc":
      ret = termsData.sort((a, b) => a.term.localeCompare(b.term));
      break;
    case "desc":
      ret = termsData.sort((a, b) => b.term.localeCompare(a.term));
      break;
    default:
      ret = termsData;
  }

  res.json(ret);
});

// ":term" means route can be whatever the user wants
// the colon represents a dynamic parameter
// eg: /api/terms/whateverIwant

// what follows the : (the parameter) is what will show up as the key in the
// request.params

app.get("/api/terms/:term", (req, res) => {
  // get the desired term from the req.params
  const { term } = req.params;

  // find the desired term in the array
  const requestedTerm = termsData.find(
    (t) => t.term.toUpperCase() === term.toUpperCase()
  );

  // if we find the term, send it back as JSON
  // else, tell them we did not find it
  // 404 mean user made a bad request
  if (requestedTerm) {
    res.json(requestedTerm);
  } else {
    res.status(404).json({ error: `Term ${term} not found. :(` });
  }
});

// start the server
// npm start
app.listen(port, () => {
  console.info("server running on 3001");
});
