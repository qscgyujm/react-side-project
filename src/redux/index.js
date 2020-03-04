import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import { 
  saga as ProductSaga,
  reducer as ProductReducer,
} from './product';

import { 
  saga as OrderSaga,
  reducer as OrderReducer,
} from './order';

import {
  saga as ProfileSaga,
  reducer as ProfileReducer,
} from './profile';

import {
  saga as AuthSaga,
  reducer as AuthReducer,
} from './auth';

import {
  saga as FilSaga,
  reducer as FileReducer,
} from './file';

export function* rootSaga() {
  yield all([
    ...ProductSaga,
    ...OrderSaga,
    ...ProfileSaga,
    ...AuthSaga,
    ...FilSaga,
  ])
}

export const rootReducer = combineReducers({
  product: ProductReducer,
  order: OrderReducer,
  profile: ProfileReducer,
  auth: AuthReducer,
  file: FileReducer,
})


