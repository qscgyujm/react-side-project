import { takeLatest, call, put } from 'redux-saga/effects';

import * as API from '../api/index';

// State
const initialState = {
  isAuth: false,
  isFetch: false,
  isError: false,
}

//  Action
const ActionType = {
  CHECK_AUTH_REQUEST: 'CHECK_AUTH_REQUEST',
  CHECK_AUTH_SUCCESS: 'CHECK_AUTH_SUCCESS',
  CHECK_AUTH_FAILURE: 'CHECK_AUTH_FAILURE',
  LOGIN_AUTH_REQUEST: 'LOGIN_AUTH_REQUEST',
  LOGIN_AUTH_SUCCESS: 'LOGIN_AUTH_SUCCESS',
  LOGIN_AUTH_FAILURE: 'LOGIN_AUTH_FAILURE',
  LOGOUT_AUTH_REQUEST: 'LOGOUT_AUTH_REQUEST',
  LOGOUT_AUTH_SUCCESS: 'LOGOUT_AUTH_SUCCESS',
  LOGOUT_AUTH_FAILURE: 'LOGOUT_AUTH_FAILURE',
}

export const action = {
  checkAuth: () => ({type: ActionType.CHECK_AUTH_REQUEST}),
  checkAuthSuccess: () => ({type: ActionType.CHECK_AUTH_SUCCESS}),
  checkAuthFailure: () => ({type: ActionType.CHECK_AUTH_FAILURE}),
  loginAuth: (body) => ({type: ActionType.LOGIN_AUTH_REQUEST, payload: body}),
  loginAuthSuccess: () => ({type: ActionType.LOGIN_AUTH_SUCCESS}),
  loginAuthFailure: () => ({type: ActionType.LOGIN_AUTH_FAILURE}),
  logoutAuth: () => ({type: ActionType.LOGOUT_AUTH_REQUEST}),
  logoutAuthSuccess: () => ({type: ActionType.LOGOUT_AUTH_SUCCESS}),
  logoutAuthFailure: () => ({type: ActionType.LOGOUT_AUTH_FAILURE}),
}

// Saga

function* checkAuthSaga() {
  try {
    const oldToken = localStorage.getItem('token');

    if(!oldToken){
      throw new Error('error');
    }

    const response = yield call(API.checkAuth, oldToken);
    const { headers } = response;
    const { token: newToken } = headers;
    localStorage.setItem('token', newToken);

    yield put(action.checkAuthSuccess());
  } catch (error) {
    yield put(action.checkAuthFailure());
  }
}

function* loginAuthSaga(input) {
  try {
    const { payload } = input;
    
    const response = yield call(API.postLogin, payload);
    const { data, headers } = response;
    const { token } = headers;
    
    
    if(!token) {
      throw new Error('no token');
    } else {
      localStorage.setItem('token', token)
      yield put(action.loginAuthSuccess());
    }
  } catch (error) {
    yield put(action.loginAuthFailure());
  }
}

function* logoutAuthSaga() {
  try {
    localStorage.removeItem('token');

    yield put(action.logoutAuthSuccess());
  } catch (error) {
    yield put(action.logoutAuthFailure());
  }
}

export const saga = [
  takeLatest(ActionType.CHECK_AUTH_REQUEST, checkAuthSaga),
  takeLatest(ActionType.LOGIN_AUTH_REQUEST, loginAuthSaga),
  takeLatest(ActionType.LOGOUT_AUTH_REQUEST, logoutAuthSaga),
];

// Reducer

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHECK_AUTH_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.CHECK_AUTH_FAILURE:
      return {
        ...state,
        isFetch: false,
        isAuth: false,
      };
    case ActionType.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        isFetch: false,
        isAuth: true,
      }
      case ActionType.LOGIN_AUTH_REQUEST:
        return {
          ...state,
          isFetch: true,
        };
      case ActionType.LOGIN_AUTH_FAILURE:
        return {
          ...state,
          isError: true,
        };
      case ActionType.LOGIN_AUTH_SUCCESS:
        return {
          ...state,
          isFetch: false,
          isAuth: true,
        }
    case ActionType.LOGOUT_AUTH_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.LOGOUT_AUTH_FAILURE:
      return {
        ...state,
        isError: true,
      };
    case ActionType.LOGOUT_AUTH_SUCCESS:
      return {
        ...state,
        isFetch: false,
        isAuth: false,
      }
    default:
      return state;
  }
}
