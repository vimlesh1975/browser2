import { combineReducers } from 'redux';
import videoReducer from './video/videoReducer';
import searchReducer from './search/searchReducer';
import cueSheetReducer from './cueSheetReducer';
import userReducer from './userReducer';
import bgReducer from './bgReducer'
import languageReducer from './languageReducer'
import userListReducer from './userListReducer'



const rootReducer = combineReducers({
    video: videoReducer,
    search: searchReducer,
    cueSheetReducer,
    userReducer,
    bgReducer,
    languageReducer,
    userListReducer
})

export default rootReducer;