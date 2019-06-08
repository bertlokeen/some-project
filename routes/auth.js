const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errors');

const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.validate, catchErrors(AuthController.login)
);

module.exports = router;
