import { takeLatest, call, put } from 'redux-saga/effects';

import * as API from '../api/index';

// State
const initialState = {
  isAuth: null,
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
  SEND_VERIFY_CODE_REQUEST: 'SEND_VERIFY_CODE_REQUEST',
  SEND_VERIFY_CODE_FAILURE: 'SEND_VERIFY_CODE_FAILURE',
  SEND_VERIFY_CODE_SUCCESS: 'SEND_VERIFY_CODE_SUCCESS',
  CHECK_VERIFY_CODE_REQUEST: 'CHECK_VERIFY_CODE_REQUEST',
  CHECK_VERIFY_CODE_FAILURE: 'CHECK_VERIFY_CODE_FAILURE',
  CHECK_VERIFY_CODE_SUCCESS: 'CHECK_VERIFY_CODE_SUCCESS',
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
  sendCode: (email, resolve) => ({type: ActionType.SEND_VERIFY_CODE_REQUEST, payload: { email, resolve}}),
  sendCodeSuccess: () => ({type: ActionType.SEND_VERIFY_CODE_SUCCESS}),
  sendCodeFailure: () => ({type: ActionType.SEND_VERIFY_CODE_FAILURE}),
  checkCode: (body, resolve, reject) => ({type: ActionType.CHECK_VERIFY_CODE_REQUEST, payload: { body, resolve, reject}}),
  checkCodeSuccess: () => ({type: ActionType.CHECK_VERIFY_CODE_SUCCESS}),
  checkCodeFailure: () => ({type: ActionType.CHECK_VERIFY_CODE_FAILURE}),
}

// Saga

function* checkAuthSaga() {
  console.log('check Auth');
  try {
    const oldToken = localStorage.getItem('token');

    if(!oldToken){
      throw new Error('error');
    }

    // const response = yield call(API.checkAuth, oldToken);
    // console.log('response', response);

    // const { headers } = response;
    // const { token: newToken } = headers;
    // localStorage.setItem('token', newToken);

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
      localStorage.setItem('token', token);
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

function* sendCodeSaga({ payload }) {
  try {
    console.log('sendCodeSaga', payload);
    const { email, resolve } = payload;
    
    yield call(API.sendCode, email);

    if(resolve) {
      console.log('resolve');
      resolve();
    }

    yield put(action.sendCodeSuccess());
  } catch (error) {
    yield put(action.sendCodeFailure());
  }
}

function* checkCodeSaga({payload}) {
  const { body, resolve, reject } = payload;
  try {
    console.log(body, resolve);

    yield call(API.checkCode, body);
    
    if(resolve) {
      resolve();
    }

    yield put(action.checkCodeSuccess());
  } catch (error) {
    yield put(action.checkCodeFailure());
  }
}

export const saga = [
  takeLatest(ActionType.CHECK_AUTH_REQUEST, checkAuthSaga),
  takeLatest(ActionType.LOGIN_AUTH_REQUEST, loginAuthSaga),
  takeLatest(ActionType.LOGOUT_AUTH_REQUEST, logoutAuthSaga),
  takeLatest(ActionType.SEND_VERIFY_CODE_REQUEST, sendCodeSaga),
  takeLatest(ActionType.CHECK_VERIFY_CODE_REQUEST, checkCodeSaga),
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
    case ActionType.SEND_VERIFY_CODE_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.SEND_VERIFY_CODE_FAILURE:
      return {
        ...state,
        isError: true,
      };
    case ActionType.SEND_VERIFY_CODE_SUCCESS:
      return {
        ...state,
        isFetch: false,
      }
    case ActionType.CHECK_VERIFY_CODE_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.CHECK_VERIFY_CODE_FAILURE:
      return {
        ...state,
        isError: true,
      };
    case ActionType.CHECK_VERIFY_CODE_SUCCESS:
      return {
        ...state,
        isFetch: false,
      }
    default:
      return state;
  }
}