import { LOG_IN_INFO } from "../actions/actions";
import storageSession from "redux-persist/lib/storage/session";
import {persistReducer} from 'redux-persist';

const initState = {
    userInfo: 
        {
            _id: '',
            username: '',
            nickname: '',
            password: '',
            avatarSet: false,
            avatarImage: '',
            isAdmin: false
        }
    
};

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case LOG_IN_INFO:
            return Object.assign({}, state, {userInfo: action.payload});
        default:
            return state;
    }
};

const persistConfig = {
    key: 'root',
    storage: storageSession,
};

export default persistReducer(persistConfig, userReducer);