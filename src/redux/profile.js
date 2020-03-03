import { takeLatest, call, put } from 'redux-saga/effects';

import * as API from '../api/index';

// State
const initialState = {
  profile: null,
  isFetch: false,
  isError: false,
}

//  Action
const ActionType = {
  FETCH_PROFILE_REQUEST: 'FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS: 'FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE: 'FETCH_PROFILE_FAILURE',
  CREATE_PROFILE_REQUEST: 'CREATE_PROFILE_REQUEST',
  CREATE_PROFILE_SUCCESS: 'CREATE_PROFILE_SUCCESS',
  CREATE_PROFILE_FAILURE: 'CREATE_PROFILE_FAILURE',
  UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: 'UPDATE_PROFILE_FAILURE',
  UPDATE_PROFILE_PASSWORD_REQUEST: 'UPDATE_PROFILE_PASSWORD_REQUEST',
  UPDATE_PROFILE_PASSWORD_SUCCESS: 'UPDATE_PROFILE_PASSWORD_SUCCESS',
  UPDATE_PROFILE_PASSWORD_FAILURE: 'UPDATE_PROFILE_PASSWORD_FAILURE',
}

export const action = {
  createProfile: (profile, resolve, reject) => ({type: ActionType.CREATE_PROFILE_REQUEST, profile, resolve, reject}),
  createProfileFailure: () => ({type: ActionType.CREATE_PROFILE_FAILURE}),
  createProfileSuccess: () => ({type: ActionType.CREATE_PROFILE_SUCCESS}),
  fetchProfile: () => ({type: ActionType.FETCH_PROFILE_REQUEST}),
  fetchProfileFailure: () => ({type: ActionType.FETCH_PROFILE_FAILURE}),
  fetchProfileSuccess: (profile) => ({type: ActionType.FETCH_PROFILE_SUCCESS, payload: profile}),
  updateProfile: (profile) => ({type: ActionType.UPDATE_PROFILE_REQUEST, profile}),
  updateProfileFailure: () => ({type: ActionType.UPDATE_PROFILE_FAILURE}),
  updateProfileSuccess: (profile) => ({type: ActionType.UPDATE_PROFILE_SUCCESS, payload: profile}),
  updatePassword: (passwordObj, resolve) => ({type: ActionType.UPDATE_PROFILE_PASSWORD_REQUEST, passwordObj, resolve}),
  updatePasswordFailure: () => ({type: ActionType.UPDATE_PROFILE_PASSWORD_FAILURE}),
  updatePasswordSuccess: () => ({type: ActionType.UPDATE_PROFILE_PASSWORD_SUCCESS}),
}

// Saga

function* fetchProfileSaga() {
  try {
    const token = localStorage.getItem('token');

    const { data } = yield call(API.getProfile, token);
    const { profile } = data;
    console.log('data', data, token);


     yield put(action.fetchProfileSuccess(profile));
  } catch (error) {
    yield put(action.fetchProfileFailure());
  }
}

function* createProfileSaga(payload) {
  const { profile, resolve, reject } = payload;
  console.log('create success', payload);
  try {

    if(resolve) {
      resolve();
    }

    yield put(action.createProfileSuccess());
  } catch (error) {
    reject();
    yield put(action.createProfileFailure());
  }
}

function* updateProfileSaga(payload) {
  try {
    const token = localStorage.getItem('token');

    const { data } = yield call(API.updateProfile, {...payload, token})
    const { profile } = data;

    yield put(action.updateProfileSuccess(profile));
  } catch (error) {
    yield put(action.updateProfileFailure());
  }
}

function* updateProfilePasswordSaga(payload) {
  try {
    console.log('updateProfilePasswordSaga', payload);
    const token = localStorage.getItem('token');
    const { passwordObj, resolve } = payload;

    yield call(API.updateProfilePassword, {passwordObj, token})

    if(resolve) {
      resolve();
    }

    yield put(action.updatePasswordSuccess());
  } catch (error) {
    yield put(action.updateProfileFailure());
  }
}

export const saga = [
  takeLatest(ActionType.FETCH_PROFILE_REQUEST, fetchProfileSaga),
  takeLatest(ActionType.CREATE_PROFILE_REQUEST, createProfileSaga),
  takeLatest(ActionType.UPDATE_PROFILE_REQUEST, updateProfileSaga),
  takeLatest(ActionType.UPDATE_PROFILE_PASSWORD_REQUEST, updateProfilePasswordSaga),
];

// Reducer

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CREATE_PROFILE_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.CREATE_PROFILE_FAILURE:
      return {
        ...state,
        isError: true,
      };
    case ActionType.CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        isFetch: false,
      }
    case ActionType.FETCH_PROFILE_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.FETCH_PROFILE_FAILURE:
      return {
        ...state,
        isError: true,
      };
    case ActionType.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {...action.payload},
        isFetch: false,
      }
    case ActionType.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isError: true,
      };
    case ActionType.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {...action.payload},
        isFetch: false,
      }
    case ActionType.UPDATE_PROFILE_PASSWORD_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.UPDATE_PROFILE_PASSWORD_FAILURE:
      return {
        ...state,
        isError: true,
      };
    case ActionType.UPDATE_PROFILE_PASSWORD_SUCCESS:
      return {
        ...state,
        isFetch: false,
      }
    default:
      return state;
  }
}
