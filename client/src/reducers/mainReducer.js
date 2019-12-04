import {ADD_PASTEY_ERR, GET_PASTEYS, GET_PASTEYS_ERR} from '../actions/types';

const initalState = {
    pasteys: null,
    publicPasteyLoading: true,
    getPasteysError: null,
    addPasteyError: null,
}
function mainReducer(state=initalState, action){
    switch (action.type) {
        case GET_PASTEYS:
            return {
                ...state,
                publicPasteyLoading: false,
                pasteys: [...action.payload]
            }
        case GET_PASTEYS_ERR:
            return {
                ...state,
                getPasteysError: action.payload
            }
        case ADD_PASTEY_ERR:
            return {
                ...state,
                addPasteyError: action.payload
            }
        default:
            return state;
    }
}

export default mainReducer