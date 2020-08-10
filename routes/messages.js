const express = require('express');
const router = express.Router();
const {index, create, update, destroy} = require('../controllers/messages');

router.get('/', index); // GET "/messages" -> Returns all messages (Message Index)
router.post('/', create); // POST "/messages" -> Create a message (Message Create)
router.patch('/:id', update); // PATCH "/messages/:id" -> Update a message (Message Update)
router.delete('/:id', destroy); // DELETE "/messages/:id" -> Delete a message (Message Delete)

module.exports = router;
