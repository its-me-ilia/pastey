import {combineReducers} from 'redux';
import pasteyReducer from './pasteyReducer';
import mainReducer from './mainReducer';
import archiveReducer from './archiveReducer' 
export default combineReducers({
    pasteyr: pasteyReducer,
    mainr: mainReducer,
    archiver: archiveReducer
})