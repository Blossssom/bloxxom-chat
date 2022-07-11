export const LOG_IN_INFO = 'LOG_IN_INFO';

export const loginInfo = (userInfo) => {
    const {_id, username, nickname, password, avatarSet, avatarImage} = userInfo;
    // console.log('id', _id, 'name', username, 'nickname', nickname, 'password', password,'avatarSet', avatarSet,'avatarImage', avatarImage);
    return {
        type: LOG_IN_INFO,
        payload: {
            _id,
            username,
            nickname,
            password,
            avatarSet,
            avatarImage
        }
    }
};