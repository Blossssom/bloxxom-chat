const express = require('express');
const router = express.Router();
const { signin, login, allUser, addChatLog, getChatLog } = require('../controller/controller');

router.post('/signin', signin);
router.post('/login', login);
router.get('/allusers/:id', allUser);
router.post('/addmsg', addChatLog);
router.post('/getmsg', getChatLog);

module.exports = router;