const express = require("express");
cookieParser = require("cookie-parser");
require("dotenv").config();
const dbConfig = require("./dbConfig");
const route = require("./routes");
const { generateResetToken } = require("./utils/helpers");
const cloudinaryConfig = require("./utils/cloudinaryConfig");

const app = express();
const port = 8000;
app.use(express.json());
app.use(cookieParser());

dbConfig();
cloudinaryConfig()
app.use(route);





app.listen(port, () => {
  console.log(`server is running`);
});
