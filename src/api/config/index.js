const dotenv = require('dotenv');

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error(" Couldn't find .env file");
}


module.exports = {
    /**
     * PORT CONFIG
     */

    port: process.env.SERVER_PORT || 5000,

    /**
     * MYSQL CONFIG
     */
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}