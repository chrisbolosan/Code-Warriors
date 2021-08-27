const express = require("express");
const router = express.Router();
const authHandler = require("../middleware/auth");

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  signup,
  login,
  getLeaderboard,
} = require("../controllers/users");

//middleware for only authorized users and admins

router.route("/").get(authHandler, getUsers);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/leaderboard").get(getLeaderboard);
router
  .route("/:id")
  .get(getUser)
  .put(authHandler, updateUser)
  .delete(authHandler, deleteUser);

module.exports = router;
