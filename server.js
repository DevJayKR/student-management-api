const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.SERVER_PORT || 5000;
const api = require("./src/api/router");

app.use(logger);

app.use("/api", api);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});

function logger(req, res, next) {
  console.log(`[${req.method}] ${req.url}`);
}
