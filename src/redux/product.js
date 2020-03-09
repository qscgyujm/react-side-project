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
  DELETE_PRODUCT_REQUEST: 'DELETE_PRODUCT_REQUEST',
  DELETE_PRODUCT_SUCCESS: 'DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_FAILURE: 'DELETE_PRODUCT_FAILURE',
}

export const action = {
  fetchProduct: () => ({type: ActionType.FETCH_PRODUCT_REQUEST}),
  fetchProductSuccess: (productList) => ({type: ActionType.FETCH_PRODUCT_SUCCESS, payload: productList }),
  fetchProductFailure: () => ({type: ActionType.FETCH_PRODUCT_FAILURE}),
  createProduct: (body, resolve) => ({type: ActionType.CREATE_PRODUCT_REQUEST, payload: { body: body, resolve: resolve }}),
  createProductSuccess: (productList) => ({type: ActionType.CREATE_PRODUCT_SUCCESS, payload: productList}),
  createProductFailure: () => ({type: ActionType.CREATE_PRODUCT_FAILURE}),
  updateProduct: (id, body, resolve) => ({type: ActionType.UPDATE_PRODUCT_REQUEST, payload: { id: id, body: body, resolve: resolve }}),
  updateProductSuccess: (productList) => ({type: ActionType.UPDATE_PRODUCT_SUCCESS, payload: productList }),
  updateProductFailure: () => ({type: ActionType.UPDATE_PRODUCT_FAILURE}),
  deleteProduct: (id) => ({type: ActionType.DELETE_PRODUCT_REQUEST, id}),
  deleteProductSuccess: (productList) => ({type: ActionType.DELETE_PRODUCT_SUCCESS, payload: productList}),
  deleteProductFailure: () => ({type: ActionType.DELETE_PRODUCT_FAILURE}),
}

// Saga

function* fetchProductSaga() {
  try {
    const token = localStorage.getItem('token');

    const { data } = yield call(API.getProductList, token);
    yield put(action.fetchProductSuccess(data));
  } catch (error) {
    yield put(action.fetchProductSuccess());
  }
}

function* createProductSaga({ payload }) {
  try {
    const token = localStorage.getItem('token');
    
    const { resolve } = payload;

    const { data } = yield call(API.createProduct, { ...payload, token});
    const { productList } = data;

    if(resolve){
      resolve();
    }
    
    yield put(action.createProductSuccess(productList));
  } catch (error) {
    yield put(action.createProductFailure());
  }
}

function* updateProductSaga({ payload }) {
  try {
    const token = localStorage.getItem('token');
    
    const { resolve } = payload;
    const { data } = yield call(API.updateProduct, { ...payload, token});
    const { productList } = data;

    if(resolve) {
      resolve();
    }

    yield put(action.updateProductSuccess(productList));
  } catch (error) {
    yield put(action.updateProductFailure());
  }
}

function* deleteProductSaga(payload) {
  try {
    const token = localStorage.getItem('token');
    
    const { data } = yield call(API.deleteProduct, {...payload , token});
    const { productList } = data;
    console.log('deleteProductSaga', productList);

    yield put(action.deleteProductSuccess(productList));
  } catch (error) {
    yield put(action.deleteProductFailure());
  }
}

export const saga = [
  takeLatest(ActionType.FETCH_PRODUCT_REQUEST, fetchProductSaga),
  takeLatest(ActionType.CREATE_PRODUCT_REQUEST, createProductSaga),
  takeLatest(ActionType.UPDATE_PRODUCT_REQUEST, updateProductSaga),
  takeLatest(ActionType.DELETE_PRODUCT_REQUEST, deleteProductSaga),
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
        productList: action.payload,
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
        productList: action.payload,
        isFetch: false,
      }
    case ActionType.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        isFetch: false,
        isError: true,
      };
    case ActionType.DELETE_PRODUCT_SUCCESS:
      console.log('action.payload', action.payload);
      return {
        ...state,
        productList: action.payload,
        isFetch: false,
      }
    default:
      return state;
  }
}
