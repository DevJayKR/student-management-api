const express = require("express");
const app = express();
const dotenv = require('dotenv');
const port = process.env.SERVER_PORT
const api = require("./src/api/router");

app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/api", api);

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.listen(port, () => {
	console.log(`server listening at http://localhost:${port}`);
});

function logger(req, res, next) {
	console.log(`[${req.method}] ${req.url}`);
	next();
}
