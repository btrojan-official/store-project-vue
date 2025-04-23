import { loginUser, logoutUser, getCurrentUser } from '@/api';
import router from '@/router';
import Cookies from 'js-cookie';

const user = {
    state: {
        userObject: null,
        userLoading: false,
    },

    mutations:{
        SET_CURRENT_USER(state, userObject) {
            state.userObject = userObject;
        },
        SET_USER_LOADING(state, value) {
            state.userLoading = value;
        }
    },

    getters:{
        GET_CURRENT_USER(state) {
            return state.userObject;
        },
        GET_USER_LOADING(state) {
            return state.userLoading;
        }
    },

    actions: {
        LOGIN_USER({ commit, getters }, { email, password }) {

            commit("SET_USER_LOADING", true);
      
            return loginUser({ "email": email, "password": password })
              .then((data) => {
      
                if (data.status == "authorized") {
                  commit("SET_CURRENT_USER", data);
                  Cookies.set('email', data.email, { expires: 1 });
                  Cookies.set('token', data.token, { expires: 1 });
                }
              })
              .finally(() => {
                commit("SET_USER_LOADING", false);
              });
        },
        LOGOUT_USER({ commit, state }) {
            if(state.userObject){
              logoutUser(user);
              commit("SET_CURRENT_USER", null);
              Cookies.remove('user');
              Cookies.remove('token');
            }
            return;
        },
        FETCH_CURRENT_USER({ commit, getters }) {

            //jeśli w store jest user to go zwróć
      
            if (getters.GET_CURRENT_USER) {
              return Promise.resolve();
            }
      
            //jeśli w store nie ma usera to go weź z serwera
            //czyli z api /getCurrentUser
      
            else {
      
              commit("SET_USER_LOADING", true);
              //
              return getCurrentUser()
                .then((data) => {
                  if (data.status == "authorized") {
                    commit("SET_CURRENT_USER", data);
                  } else{
                    router.push("/login");
                  }
                })
                .finally(() => {
                  commit("SET_USER_LOADING", false);
                });
            }
        }
    }
}

export default user