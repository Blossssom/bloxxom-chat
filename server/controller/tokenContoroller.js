require('dotenv').config({path: "D:/frontend-projects/bloxxom-chat/server/.env"});
const {verify, sign} = require('jsonwebtoken');

module.exports = {
    generateToken: async (user, checked) => {
        const payload = {
            id: user.id,
            isAdmin: user.isAdmin
        };

        const token = {
            accessToken: sign(payload, process.env.ACCESS_SECRET, {
                expiresIn: 10
            }),
        };

        if(checked) {
            token.refreshToken = sign(payload, process.env.REFRESH_SECRET, {
                expiresIn: '7d'
            });
        }

        return token;
    },

    verifyToken: async (type, token) => {
        let secretKey, decoded;
        switch (type) {
        case 'access':
            secretKey = process.env.ACCESS_SECRET;
            break;
        case 'refresh':
            secretKey = process.env.REFRESH_SECRET;
            break;
        default:
            return null;
        }

        try {
            decoded = await verify(token, secretKey);
          } catch (err) {
            console.log(`JWT Error: ${err.message}`);
            return null;
          }
          return decoded;
    }
}