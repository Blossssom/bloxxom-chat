import {createStore} from 'redux';
import persistReducer from '../reducers/userReducer';

const store = createStore(persistReducer);

export default store;