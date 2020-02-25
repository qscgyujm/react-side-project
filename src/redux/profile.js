import { takeLatest, call, put, delay } from 'redux-saga/effects';

// import API from '../api/index';

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
}

export const action = {
  createProfile: (profile, resolve, reject) => ({type: ActionType.CREATE_PROFILE_REQUEST, profile, resolve, reject}),
  createProfileFailure: () => ({type: ActionType.CREATE_PROFILE_FAILURE}),
  createProfileSuccess: () => ({type: ActionType.CREATE_PROFILE_SUCCESS}),
  fetchProfile: () => ({type: ActionType.FETCH_PROFILE_REQUEST}),
  fetchProfileFailure: (profile) => ({type: ActionType.FETCH_PROFILE_FAILURE, profile}),
  fetchProfileSuccess: (profile) => ({type: ActionType.FETCH_PROFILE_SUCCESS, payload: profile}),
}

// Saga

function* fetchProfileSaga() {
  try {
    yield put(action.fetchProfileSuccess({
      email: 'test@gmail.com',
      name: 'tes',
      password: 'abc',
      location: 'taiwan',
    }));
  } catch (error) {
    yield put(action.FETCH_PROFILE_FAILURE());
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

export const saga = [
  takeLatest(ActionType.FETCH_PROFILE_REQUEST, fetchProfileSaga),
  takeLatest(ActionType.CREATE_PROFILE_REQUEST, createProfileSaga),
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
    default:
      return state;
  }
}
