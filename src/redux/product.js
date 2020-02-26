import { takeLatest, call, put } from 'redux-saga/effects';

import * as API from '../api/index';

// State
const initialState = {
  product: [],
  isFetch: false,
  isError: false,
}

//  Action
const ActionType = {
  FETCH_PRODUCT_REQUEST: 'FETCH_PRODUCT_REQUEST',
  FETCH_PRODUCT_SUCCESS: 'FETCH_PRODUCT_SUCCESS',
  FETCH_PRODUCT_FAILURE: 'FETCH_PRODUCT_FAILURE',
}

export const action = {
  fetchProduct: () => ({type: ActionType.FETCH_PRODUCT_REQUEST}),
  fetchProductSuccess: (product) => ({type: ActionType.FETCH_PRODUCT_SUCCESS, payload: product }),
  fetchProductFailure: () => ({type: ActionType.FETCH_PRODUCT_FAILURE}),
}

// Saga

function* fetchProductSaga() {
  try {
    const { data } = yield call(API.getTestProduct);
    yield put(action.fetchProductSuccess(data));
  } catch (error) {
    yield put(action.fetchProductSuccess());
  }
}

export const saga = [
  takeLatest(ActionType.FETCH_PRODUCT_REQUEST, fetchProductSaga),
];

// Reducer

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        isFetch: false,
        isError: true,
      };
    case ActionType.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isFetch: false,
      }
    default:
      return state;
  }
}
