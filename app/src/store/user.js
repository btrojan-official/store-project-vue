import { loginUser, logoutUser, getCurrentUser } from '@/api';

const user = {
    state: {
        userObject: null,
        userLoading: false,
    },

    mutations:{
        SET_CURRENT_USER(state, userObject) {
            state.userObject = userObject;
        }
    },

    getters:{
        GET_CURRENT_USER(state) {
            return state.userObject;
        }
    },

    actions: {
    }
}

export default user