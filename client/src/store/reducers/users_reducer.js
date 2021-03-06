import {AUTH_USER} from "../types";


let DEFAULT_USER_STATE = {
    data: {
        _id: null,
        email: null,
        firstName: null,
        lastName: null,
        age: null,
        role: null,
    },
    auth: null
}

export default function userReducer(state = DEFAULT_USER_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state, data: {...state.data, ...action.payload.data},
                auth: action.payload.auth,

            }
        default:
            return state
    }
}
