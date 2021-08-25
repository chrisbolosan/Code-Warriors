const express = require('express');
const router = express.Router();

const {
  getExercises,
  createExercise,
  updateExercise,
  getExercise,
  deleteExercise,
  testExercise,
} = require('../controllers/exercises');

const { protect } = require('../middleware/auth');

router.route('/').get(getExercises).post(createExercise);

router.route('/solution').post(testExercise);

router
  .route('/:id')
  .get(getExercise)
  .put(updateExercise)
  .delete(deleteExercise);

module.exports = router;
