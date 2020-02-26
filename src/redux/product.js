import { takeLatest, call, put } from 'redux-saga/effects';

import * as API from '../api/index';

// State
const initialState = {
  productList: [],
  isFetch: false,
  isError: false,
}

//  Action
const ActionType = {
  FETCH_PRODUCT_REQUEST: 'FETCH_PRODUCT_REQUEST',
  FETCH_PRODUCT_SUCCESS: 'FETCH_PRODUCT_SUCCESS',
  FETCH_PRODUCT_FAILURE: 'FETCH_PRODUCT_FAILURE',
  CREATE_PRODUCT_REQUEST: 'CREATE_PRODUCT_REQUEST',
  CREATE_PRODUCT_SUCCESS: 'CREATE_PRODUCT_SUCCESS',
  CREATE_PRODUCT_FAILURE: 'CREATE_PRODUCT_FAILURE',
  UPDATE_PRODUCT_REQUEST: 'UPDATE_PRODUCT_REQUEST',
  UPDATE_PRODUCT_SUCCESS: 'UPDATE_PRODUCT_SUCCESS',
  UPDATE_PRODUCT_FAILURE: 'UPDATE_PRODUCT_FAILURE',
}

export const action = {
  fetchProduct: () => ({type: ActionType.FETCH_PRODUCT_REQUEST}),
  fetchProductSuccess: (productList) => ({type: ActionType.FETCH_PRODUCT_SUCCESS, payload: productList }),
  fetchProductFailure: () => ({type: ActionType.FETCH_PRODUCT_FAILURE}),
  createProduct: (product) => ({type: ActionType.CREATE_PRODUCT_REQUEST, payload: product}),
  createProductSuccess: (productList) => ({type: ActionType.CREATE_PRODUCT_SUCCESS, payload: productList}),
  createProductFailure: () => ({type: ActionType.CREATE_PRODUCT_FAILURE}),
  updateProduct: (product) => ({type: ActionType.UPDATE_PRODUCT_REQUEST, payload: product}),
  updateProductSuccess: (productList) => ({type: ActionType.UPDATE_PRODUCT_SUCCESS, payload: productList }),
  updateProductFailure: () => ({type: ActionType.UPDATE_PRODUCT_FAILURE}),
}

// Saga

function* fetchProductSaga() {
  try {
    const token = localStorage.getItem('token');
    console.log('token', token);

    const { data } = yield call(API.getProductList, token);
    yield put(action.fetchProductSuccess(data));
  } catch (error) {
    yield put(action.fetchProductSuccess());
  }
}

function* createProductSaga(payload) {
  try {
    const token = localStorage.getItem('token');
    
    console.log('create product', payload);

    
    yield put(action.createProductSuccess());
  } catch (error) {
    yield put(action.createProductFailure());
  }
}

function* updateProductSaga(payload) {
  try {
    const token = localStorage.getItem('token');
    
    console.log('update product', payload);

    // const { data } = yield call(API.getProductList, token);
    yield put(action.updateProductSuccess());
  } catch (error) {
    yield put(action.updateProductFailure());
  }
}

export const saga = [
  takeLatest(ActionType.FETCH_PRODUCT_REQUEST, fetchProductSaga),
  takeLatest(ActionType.CREATE_PRODUCT_REQUEST, createProductSaga),
  takeLatest(ActionType.UPDATE_PRODUCT_REQUEST, updateProductSaga),
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
        productList: action.payload,
        isFetch: false,
      }
    case ActionType.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        isFetch: false,
        isError: true,
      };
    case ActionType.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        // productList: action.payload,
        isFetch: false,
      }
    case ActionType.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        isFetch: false,
        isError: true,
      };
    case ActionType.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        // productList: action.payload,
        isFetch: false,
      }
    default:
      return state;
  }
}
