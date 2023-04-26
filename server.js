const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.SERVER_PORT;
const api = require("./src/api/router");

app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
