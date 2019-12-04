import {GET_PUBLIC_PASTEYS, GET_PUBLIC_PASTEYS_ERR} from '../actions/types';

const initialState = {
    publicPasteys: null,
    currentPage: null,
    totalPages: null,
    loading: true,
    publicPasteysErr: null
}

function archiveReducer(state=initialState,action){
    switch (action.type) {
        case GET_PUBLIC_PASTEYS:
           return {
               ...state,
               publicPasteys: [...action.payload.pasteys],
               currentPage: action.payload.currentPage,
               totalPages: action.payload.totalPages,
               loading: action.payload.loading
           }
        case GET_PUBLIC_PASTEYS_ERR: 
            return {
                ...state,
                publicPasteyeErr: action.payload
            }
        default:
            return state
    }
}

export default archiveReducer;