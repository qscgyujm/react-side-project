import { takeLatest, call, put, delay } from 'redux-saga/effects';

// import API from '../api/index';

// State
const initialState = {
  isAuth: true,
  isFetch: false,
  isError: false,
}

//  Action
const ActionType = {
  FETCH_AUTH_REQUEST: 'FETCH_AUTH_REQUEST',
  FETCH_AUTH_SUCCESS: 'FETCH_AUTH_SUCCESS',
  FETCH_AUTH_FAILURE: 'FETCH_AUTH_FAILURE',
  LOGOUT_AUTH_REQUEST: 'LOGOUT_AUTH_REQUEST',
  LOGOUT_AUTH_SUCCESS: 'LOGOUT_AUTH_SUCCESS',
  LOGOUT_AUTH_FAILURE: 'LOGOUT_AUTH_FAILURE',
}

export const action = {
  fetchAuth: () => ({type: ActionType.FETCH_AUTH_REQUEST}),
  fetchAuthSuccess: (product) => ({type: ActionType.FETCH_AUTH_SUCCESS, payload: product }),
  fetchAuthFailure: () => ({type: ActionType.FETCH_AUTH_FAILURE}),
  logoutAuth: () => ({type: ActionType.LOGOUT_AUTH_REQUEST}),
  logoutAuthSuccess: () => ({type: ActionType.LOGOUT_AUTH_SUCCESS}),
  logoutAuthFailure: () => ({type: ActionType.LOGOUT_AUTH_FAILURE}),
}

// Saga

function* fetchAuthSaga() {
  try {
    yield put(action.fetchAuthSuccess());
  } catch (error) {
    yield put(action.fetchAuthFailure());
  }
}

function* logoutAuthSaga() {
  try {
    yield put(action.logoutAuthSuccess());
  } catch (error) {
    yield put(action.logoutAuthFailure());
  }
}

export const saga = [
  takeLatest(ActionType.FETCH_AUTH_REQUEST, fetchAuthSaga),
  takeLatest(ActionType.LOGOUT_AUTH_REQUEST, logoutAuthSaga),
];

// Reducer

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_AUTH_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.FETCH_AUTH_FAILURE:
      return {
        ...state,
        isError: true,
      };
    case ActionType.FETCH_AUTH_SUCCESS:
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
