import express from "express";

// Start express
const app = express();
const port = 3001;

// We want our express app to use the stuff in the "public" directory as static assets
// static assets: do not change, not dynamic, everyone who views website sees the same thing
app.use(express.static("public"));

// express will first hit public for corresponding HTML
// since there is no "hello.html" in public, it will move down here
// (_, res) because there is no request, only response
app.use("/hello", (_, res) => {
  res.send("<p>Hello</p>");
});

// start the server
// npm start
app.listen(port, () => {
  console.info("server running on 3001");
});
