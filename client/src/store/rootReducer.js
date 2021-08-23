import {combineReducers} from 'redux'
import userReducer from './userReducer'
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';


const storageConfig = {
    key: 'root',
    version:1,
    storage: storage('user'),
    whitelist:['user']
}

const rootReducer = combineReducers({
    user:userReducer
})

export default persistReducer(storageConfig,rootReducer);