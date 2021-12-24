const express = require("express");
const app = express();
const winston = require("winston");
const PORT = process.env.PORT || 5000;

//require("./start/prod")(app);
require("./start/logging")();
require("./start/config")();
require("./start/db")();
require("./start/routes")(app);

app.listen(PORT, () => winston.info(`Server is listeninig at ${PORT}`));
