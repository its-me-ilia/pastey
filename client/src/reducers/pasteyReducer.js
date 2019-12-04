import {INIT_PASTEY, INIT_PASTEY_ERR, PRINT_ERR, DOWNLOAD_ERR} from '../actions/types'
const initialState = {
    pastey: '',
    initPasteyError: null,
    printError: null,
    downloadError: null
}
function pasteyReducer(state=initialState, action){
    switch(action.type){
        case INIT_PASTEY: 
            return {
                ...state,
                pastey: action.payload
            }
        case INIT_PASTEY_ERR: 
            return {
                ...state,
                initPasteyError: action.payload
            }
        case PRINT_ERR:
            return {
                ...state,
                printError: action.payload 
            }
        case DOWNLOAD_ERR:
            return {
                ...state,
                downloadError: action.payload
            }
        default: return state
    }
}
export default pasteyReducer