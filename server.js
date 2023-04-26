const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.SERVER_PORT;

app.get("/", (req, res) => {
  return res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
