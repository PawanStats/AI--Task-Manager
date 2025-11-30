const { getAISuggestions } = require('../Controllers/AIController');

const router = require('express').Router();

// Get AI task suggestions
router.get('/suggestions', getAISuggestions);

module.exports = router;
