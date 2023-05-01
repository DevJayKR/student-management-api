const mysql = require("mysql2");
const { host, user, password, database } = require("../config");
const pool = mysql.createPool({
	host,
	user,
	password,
	database,
	dateStrings: true,
});

module.exports = pool.promise();
