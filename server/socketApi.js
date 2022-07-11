const express = require('express');
const router = express.Router();

const app = express();
const server = require('http').createServer(app);
const io = app.get('socketio');

router.get('/', (req, res, next) => {
    
});