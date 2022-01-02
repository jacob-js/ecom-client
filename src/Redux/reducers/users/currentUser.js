import { usersActionTypes } from "../../actionsTypes/users";

const currentUser = (state, {type, payload}) => {
    switch (type) {
        case usersActionTypes.GET_CURRENT_USER_REQUEST:
            return{
                ...state,
                currUser: {
                    ...state.currUser,
                    loading: true,
                    error: null
                }
            }

        case usersActionTypes.GET_CURRENT_USER_SUCCESS:
            return{
                ...state,
                currUser: {
                    ...state.currUser,
                    loading: false,
                    error: null,
                    data: payload,
                    auth: true
                }
            }

        case usersActionTypes.GET_CURRENT_USER_FAILURE:
            return{
                ...state,
                currUser: {
                    ...state.currUser,
                    loading: false,
                    error: payload,
                    auth: false
                }
            }

        case usersActionTypes.LOGIN_SUCCESS:
            return{
                ...state,
                currUser: {
                    ...state.currUser,
                    loading: false,
                    error: null,
                    data: payload,
                    auth: true
                }
            }

        case usersActionTypes.LOGOUT_SUCCESS:
            return{
                ...state,
                currUser: {
                    ...state.currUser,
                    loading: false,
                    error: null,
                    data: {},
                    auth: false
                }
            }
    
    
        default:
            break;
    }
};

export default currentUser;