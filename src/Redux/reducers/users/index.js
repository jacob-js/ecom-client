import initialStates from "../../initialStates";
import currentUser from "./currentUser";

const users = (state = initialStates.users, action={}) =>({
    ...state,
    ...currentUser(state, action)
});

export default users;