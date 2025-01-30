const express = require('express');
const router = express.Router();
const moonwalksCtrl = require('../controllers/moonwalks');

// All paths start with '/api/moonwalks'

// POST /api/moonwalks
router.post('/', moonwalksCtrl.create);
// GET /api/moonwalks
router.get('/', moonwalksCtrl.index);
// DELETE /api/moonwalks
router.delete('/', moonwalksCtrl.delete);
// POST /api/moonwalks/:moonwalkId/comments
router.post('/:moonwalkId/comments', moonwalksCtrl.createComment);


module.exports = router;