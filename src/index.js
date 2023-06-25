const express = require("express");
const router = require("./routes/index.js");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3600;

app.use("/", router);

app.listen(port, () => console.log(`Express app running on port ${port}!`));
