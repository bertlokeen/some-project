const express = require('express');
const authenticate = require('../handlers/authenticate');
const router = express.Router();

const { catchErrors } = require('../handlers/errors');

const PostController = require('../controllers/PostController');

router.get('/', PostController.index);

router.get('/:id', authenticate, catchErrors(PostController.show));

router.put('/:id', authenticate, PostController.validate, catchErrors(PostController.update));

router.delete('/:id', authenticate, catchErrors(PostController.delete));

router.post('/create', authenticate, PostController.validate, catchErrors(PostController.create));


module.exports = router;