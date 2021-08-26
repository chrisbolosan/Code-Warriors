const express = require("express");
const router = express.Router();

const { getMe } = require("../../controllers/auth");

router.route("/me").get(getMe);

module.exports = router;
