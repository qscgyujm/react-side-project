import { takeLatest, call, put, delay } from 'redux-saga/effects';

import * as API from '../api/index';

// State
const initialState = {
  orderList: [],
  isFetch: false,
  isError: false,
}

//  Action
const ActionType = {
  FETCH_ORDER_REQUEST: 'FETCH_ORDER_REQUEST',
  FETCH_ORDER_SUCCESS: 'FETCH_ORDER_SUCCESS',
  FETCH_ORDER_FAILURE: 'FETCH_ORDER_FAILURE',
  CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST',
  CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILURE: 'CREATE_ORDER_FAILURE',
  UPDATE_ORDER_REQUEST: 'UPDATE_ORDER_REQUEST',
  UPDATE_ORDER_SUCCESS: 'UPDATE_ORDER_SUCCESS',
  UPDATE_ORDER_FAILURE: 'UPDATE_ORDER_FAILURE',
  UPDATE_SUBMIT_ORDER_REQUEST: 'UPDATE_SUBMIT_ORDER_REQUEST',
  UPDATE_SUBMIT_ORDER_FAILURE: 'UPDATE_SUBMIT_ORDER_FAILURE',
  UPDATE_SUBMIT_ORDER_SUCCESS: 'UPDATE_SUBMIT_ORDER_SUCCESS',
}

export const action = {
  fetchOrder: () => ({type: ActionType.FETCH_ORDER_REQUEST}),
  fetchOrderSuccess: (orderList) => ({type: ActionType.FETCH_ORDER_SUCCESS, payload: orderList }),
  fetchOrderFailure: () => ({type: ActionType.FETCH_ORDER_FAILURE}),
  createOrder: (order) => ({type: ActionType.CREATE_ORDER_REQUEST, order}),
  createOrderSuccess: () => ({type: ActionType.CREATE_ORDER_SUCCESS}),
  createOrderFailure: () => ({type: ActionType.CREATE_ORDER_FAILURE}),
  updateOrder: (orderId) => ({type: ActionType.UPDATE_ORDER_REQUEST, payload: orderId}),
  updateOrderSuccess: () => ({type: ActionType.UPDATE_ORDER_SUCCESS}),
  updateOrderFailure: () => ({type: ActionType.UPDATE_ORDER_FAILURE}),
  updateSubmitOrder: (orderId) => ({type: ActionType.UPDATE_SUBMIT_ORDER_REQUEST, payload: orderId}),
  updateSubmitOrderSuccess: (orderList) => ({type: ActionType.UPDATE_SUBMIT_ORDER_SUCCESS, payload: orderList}),
  updateSubmitOrderFailure: () => ({type: ActionType.UPDATE_SUBMIT_ORDER_FAILURE}),
}

// Saga

function* fetchOrderSaga() {
  try {
    const token = localStorage.getItem('token');

    console.log('fetchOrderSaga', token);
    const { data } = yield call(API.getOrderList, { token });
    const { orderDetailList } = data;
    console.log('fetchOrderSaga', data);

    yield put(action.fetchOrderSuccess(orderDetailList));
  } catch (error) {
    yield put(action.fetchOrderFailure());
  }
}

function* createOrderSaga(payload) {
  try {
    console.log('createOrderSaga', payload);

    const token = localStorage.getItem('token');

    yield call(API.createOrder, {payload, token})

    yield put(action.createOrderSuccess());
  } catch (error) {
    yield put(action.createOrderFailure());
  }
}

function* updateOrderSaga(payload) {
  try {
    console.log('updateOrderSaga', payload);

    const token = localStorage.getItem('token');

    // yield call(API.updateSubmitOrder, {payload, token})

    yield put(action.updateOrderSuccess());
  } catch (error) {
    yield put(action.updateOrderFailure());
  }
}

function* updateSubmitOrderSaga({payload}) {
  try {
    console.log('updateSubmitOrderSaga', payload);

    const token = localStorage.getItem('token');

    yield call(API.updateSubmitOrder, {payload, token})

    yield put(action.updateOrderSuccess());
  } catch (error) {
    yield put(action.updateOrderFailure());
  }
}

export const saga = [
  takeLatest(ActionType.FETCH_ORDER_REQUEST, fetchOrderSaga),
  takeLatest(ActionType.CREATE_ORDER_REQUEST, createOrderSaga),
  takeLatest(ActionType.UPDATE_ORDER_REQUEST, updateOrderSaga),
  takeLatest(ActionType.UPDATE_SUBMIT_ORDER_REQUEST, updateSubmitOrderSaga),
];

// Reducer

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_ORDER_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.FETCH_ORDER_FAILURE:
      return {
        ...state,
        isError: true,
        isFetch: false,
      };
    case ActionType.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        isFetch: false,
        orderList: action.payload,
      }
    case ActionType.CREATE_ORDER_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.CREATE_ORDER_FAILURE:
      return {
        ...state,
        isError: true,
        isFetch: false,
      };
    case ActionType.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isFetch: false,
      }
    case ActionType.UPDATE_SUBMIT_ORDER_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.UPDATE_SUBMIT_ORDER_FAILURE:
      return {
        ...state,
        isError: true,
        isFetch: false,
      };
    case ActionType.UPDATE_SUBMIT_ORDER_SUCCESS:
      return {
        ...state,
        isFetch: false,
      }
    default:
      return state;
  }
}