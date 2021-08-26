const express = require("express");
const router = express.Router();

const {
  getExercises,
  createExercise,
  updateExercise,
  getExercise,
  deleteExercise,
  testExercise,
} = require("../controllers/exercises");

//middleware for only authorized users and admins
const { protect } = require("../middleware/auth");

router.route("/").get(getExercises).post(protect, createExercise);

router.route("/solution").post(testExercise);

router
  .route("/:id")
  .get(getExercise)
  .put(protect, updateExercise)
  .delete(protect, deleteExercise);

module.exports = router;
