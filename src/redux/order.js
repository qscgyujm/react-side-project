import { takeLatest, call, put, delay } from 'redux-saga/effects';

// import API from '../api/index';

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
}

export const action = {
  fetchOrder: () => ({type: ActionType.FETCH_ORDER_FAILURE}),
  fetchOrderSuccess: (orderList) => ({type: ActionType.FETCH_ORDER_SUCCESS, payload: orderList }),
  fetchOrderFailure: () => ({type: ActionType.FETCH_ORDER_FAILURE}),
  createOrder: () => ({type: ActionType.CREATE_ORDER_REQUEST}),
  createOrderSuccess: () => ({type: ActionType.CREATE_ORDER_SUCCESS}),
  createOrderFailure: () => ({type: ActionType.CREATE_ORDER_FAILURE}),
  updateOrder: () => ({type: ActionType.UPDATE_ORDER_REQUEST}),
  updateOrderSuccess: () => ({type: ActionType.UPDATE_ORDER_SUCCESS}),
  updateOrderFailure: () => ({type: ActionType.UPDATE_ORDER_FAILURE}),
}

// Saga

function* fetchOrderSaga() {
  try {
    yield put(action.fetchOrderSuccess());
  } catch (error) {
    yield put(action.fetchOrderFailure());
  }
}

function* createOrderSaga() {
  try {
    yield put(action.createOrderSuccess());
  } catch (error) {
    yield put(action.createOrderFailure());
  }
}

function* updateOrderSaga() {
  try {
    yield put(action.updateOrderSuccess());
  } catch (error) {
    yield put(action.updateOrderFailure());
  }
}

export const saga = [
  takeLatest(ActionType.FETCH_ORDER_REQUEST, fetchOrderSaga),
  takeLatest(ActionType.CREATE_ORDER_REQUEST, createOrderSaga),
  takeLatest(ActionType.UPDATE_ORDER_REQUEST, updateOrderSaga),
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
