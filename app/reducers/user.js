import {
  ADD_USER, 
  AUTH_SUCCESS, 
  AUTH_FAILURE, 
  GET_AUTHORIZED_USER,
  SIGNOUT
} from '../constants';

const defaultState = {
  username: '',
  error: null
}
export const user = (state = defaultState, action) => {
  const { type } = action;

  switch(type) {
    case ADD_USER:
      return authSuccess(state, action);

    case AUTH_SUCCESS:
      return authSuccess(state, action);

    case AUTH_FAILURE:
      return authFailure(state, action);

    case GET_AUTHORIZED_USER:
      return getAuthorizedUser(state, action);

    case SIGNOUT:
      return signoutSuccess(state, action);

    default: return state;
    }
};

function authSuccess(state, action) {
  return {
        username: action.data.username,
        error: null
      }
}

function authFailure(state, action) {
  return {
        username: null,
        error: action.message
      }
}

function signoutSuccess(state, action) {
  return {
        username: null,
        error: action.message
      }
}

function getAuthorizedUser(state, action) {
  return {
        username: action.data.username,
        error: action.message
      }
}