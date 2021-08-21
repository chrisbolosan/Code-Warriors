const express = require('express');
const router = express.Router();

const {
  getExercises,
  createExercise,
  updateExercise,
  getExercise,
} = require('../controllers/exercises');

router.route('/').get(getExercises).post(createExercise);
router.route('/:id').get(getExercise).put(updateExercise);

module.exports = router;
