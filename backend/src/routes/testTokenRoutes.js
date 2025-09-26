const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/test-token
router.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'Token is valid!' });
});

module.exports = router;
