const express = require("express");
const { saveImageContoller } = require("../controllers/image.controller");
const router = express.Router();

router.get("/", (req, res, next) => {
  saveImageContoller();
  res.send("Lets merge cats!");
});

module.exports = router;
