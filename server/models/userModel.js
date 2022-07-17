const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 12,
        unique: true
    },
    nickname: {
        type: String,
        required: true,
        max: 15,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    avatarSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: ''
    },
    tokenExp: {
        type: Number,
        defalut: 0
    },
    isLoginCheck: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Users', userSchema);

// db 테이블 구성요소 model