const express = require('express');
const router = express.Router();

const { createStore } = require('../controllers/stores');

router.post('/createStore', createStore);

module.exports = router;
