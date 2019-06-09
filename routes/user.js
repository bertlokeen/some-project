const express = require('express');
const authenticate = require('../handlers/authenticate');
const router = express.Router();

const { catchErrors } = require('../handlers/errors');

const UserController = require('../controllers/UserController');

router.post('/create', UserController.validate, catchErrors(UserController.create));

router.get('/profile', authenticate, catchErrors(UserController.profile));

module.exports = router;
