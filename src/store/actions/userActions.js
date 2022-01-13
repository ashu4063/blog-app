
import "../../firebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

export const GET_USERS = "GET_USERS"
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILURE = 'GET_USER_FAILURE'
const auth = getAuth();


// Create Redux action creators that return an action
export const getUsers = () => ({
  type: GET_USERS,

})

export const getUserSuccess = (user) => ({

  type: GET_USER_SUCCESS,
  payload: user,
}

)

export const getUserFailure = () => ({
  type: GET_USER_FAILURE,
})


// Combine them all in an asynchronous thunk

export const getUserData = () => {

  return async dispatch => {

    dispatch(getUsers());

    try {
      onAuthStateChanged(auth, (user) => {
        dispatch(getUserSuccess(user));
      })


    } catch (error) {

      dispatch(getUserFailure());

    }
  };
};