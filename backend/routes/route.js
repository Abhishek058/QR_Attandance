const express = require("express");
const router = express.Router();
const { addStudent } = require("../controllers/student");

router.post("/in", addStudent);

module.exports = router;
