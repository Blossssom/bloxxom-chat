const userSchema = require('../models/userModel');
const chatSchema = require('../models/chatModel');
const bcrypt = require('bcrypt');
const {generateToken} = require('../controller/tokenContoroller');

module.exports.signin = async (req, res, next) => {
    try {
        const {username, nickname, password} = req.body;
        const checkUserName = await userSchema.findOne({username});
        const checkNickName = await userSchema.findOne({nickname});
        const hashedPassword = await bcrypt.hash(password, 10);

        if(checkUserName) {
            return res.json({msg: '이미 등록된 id 입니다.', status: false});
        }

        if(checkNickName) {
            return res.json({msg: '이미 등록된 nickname 입니다.', status: false});
        }

        const createUser = await userSchema.create({
            username,
            nickname,
            password: hashedPassword
        });

        delete createUser.password;
        return res.json({status: true, createUser});

    }catch(err) {
        next(err);
        // 현재 에러를 처리하지 않고 넘기기
    }
};


module.exports.login = async (req, res, next) => {
    try {
        const cookieOptions = {
            domain: "localhost",
            httpOnly: true,
            sameSite: 'none',
        };
        const {username, password, check} = req.body;
        const userInfo = await userSchema.findOne({username});
        
        
        if(!userInfo) {
            return res.json({msg: 'ID를 확인해주세요!!!', status: false});
        }
        
        const checkPassword = await bcrypt.compare(password, userInfo.password);

        if(!checkPassword) {
            return res.json({msg: 'Password를 확인해주세요!!!', status: false});
        }

        delete userInfo.password;

        // if(check) {
        //     try {
        //         console.log('inner try')
        //         const makeToken = await generateToken(userInfo, check);
        //         await userSchema.findByIdAndUpdate(userInfo._id, {isLoginCheck: true, token: makeToken.accessToken}, {new: true});
        //         res.cookie("access_token", makeToken.accessToken, cookieOptions);
        //         cookieOptions.maxAge = 1000 * 60 * 60 * 24 * 7;
        //         res.cookie("refresh_token", makeToken.refreshToken, cookieOptions);
        //     }catch(err) {
        //         console.log(err);
        //     }
        // }else { 

        // }


        // res.cookie("access_token", makeToken.accessToken, cookieOptions)

        return res.json({status: true, userInfo});
    }catch(err) {
        console.log(err);
    }
};


module.exports.authLogin = async (req, res, next) => {
    try {
        

    }catch(err) {
        next(err);
    }
};


module.exports.allUser = async (req, res, next) => {
    try {
        const allUsers = await userSchema.find({_id: {$ne: req.params.id}}).select([
            '_id',
            'username',
            'nickname',
            'avatarImage'
        ]);

        return res.json(allUsers);
    }catch(err) {
        next(err);
    }
};

// chat control

module.exports.addChatLog = async (req, res, next) => {
    try {
        const {from, to, message} = req.body;
        const data = await chatSchema.create({
            message: {
                text: message
            },
            users: [from, to],
            sender: from
        });

        if(data) {
            return res.json({msg: 'Add msg success!!!'});
        }else {
            return res.json({msg: 'Add msg failed!!!'});
        }
    }catch(err) {
        next(err);
    }
};


module.exports.getChatLog = async (req, res, next) => {
    try {
        const {from, to} = req.body;
        const message = await chatSchema.find({
            users: {
                $all: [from, to]
            }
        }).sort({updatedAt: 1});
        // 1: 오름차순 , -1: 내림차순 정렬
        if(message.length > 0) {
            const messageObj = message.map(msg => {
                return {
                    sender: msg.sender,
                    sendMessage: msg.message.text
                };
            });
            return res.json(messageObj);
        }else {
            return res.json({msg: 'not yet chat!!!'});
        }
        
    }catch(err) {
        next(err);
    }
};