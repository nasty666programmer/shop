import { ADD_USER, DELETE_USER,EDIT_USER } from "./types";

const initialState = {}

const userReducer = (state=initialState,action) => {
    switch(action.type) {
        case ADD_USER:
            return {...state,...action.payload}
        case DELETE_USER:
            return {
                ...action.payload
            }
        case EDIT_USER: 
            return {
                ...state, name:action.payload
            }
        default:return state;
        break;
    }
}

export default userReducer;