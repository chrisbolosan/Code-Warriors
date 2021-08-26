const express = require("express");
const router = express.Router();

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
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getUsers);
router.post("/signup", signup);
router.route("/login").post(login);
router.route("/leaderboard").get(getLeaderboard);
router
  .route("/:id")
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
