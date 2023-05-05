const express = require("express");
const api = require("./src/api/router");
const { port } = require("./src/api/config");
const { logger } = require("./src/api/common/middlewares/logger");
const passport = require("passport");
const passportConfig = require("./src/api/passport");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const yaml = require('yamljs');
const swaggerYaml = yaml.load(path.join(__dirname, 'src/api/swagger/schoolmanagement-1.0.0.yaml'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml));

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(cookieParser());
app.use(logger);

app.use(passport.initialize());
passportConfig();

app.use("/api", api);

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.listen(port, () => {
	console.log(`server listening at http://localhost:${port}`);
});
