const express = require('express');
const router = express.Router();

const {
  getExercises,
  createExercise,
  updateExercise,
  getExercise,
  deleteExercise,
  submitSolution,
  testSolution,
  getRandomExercise,
} = require('../controllers/exercises');

//middleware for only authorized users and admins
const authHandler = require('../middleware/auth');

router.route('/').get(getExercises).post(authHandler, createExercise);
router.route('/random').get(getRandomExercise);
router.route('/solution').post(submitSolution);

router
  .route('/:id')
  .get(getExercise)
  .put(authHandler, updateExercise)
  .delete(authHandler, deleteExercise);

module.exports = router;
