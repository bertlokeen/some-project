const express = require('express');
const authenticate = require('../handlers/authenticate');
const router = express.Router();

// const { catchErrors } = require('../../handlers/errors');

const UserController = require('../controllers/UserController');

router.post('/create', UserController.validate, UserController.create);

// router.get('/show', authenticate, catchErrors(userController.show));

module.exports = router;
