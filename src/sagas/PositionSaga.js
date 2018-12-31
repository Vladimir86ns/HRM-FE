/**
 * Account Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

/**
 * Imports
*/
import axios from '../Axios-laravel';
import { responseCodes } from '../constants/ResponseCode';
import APP_MESSAGES from '../../src/constants/AppMessages';

/**
 * Account types
 */
import {
  CREATE_POSITIONS
} from '../actions/types';

/**
 * Account actions
 */
import {
  //
} from '../actions/index';

/**
 * Create Account
 */
function* createPositionsBeforeSavingInDB({ payload }) {
  try {
    const newAccount = yield call(createPositionsInDB,  payload.positions);
    // if (newAccount.status === responseCodes.HTTP_OK) {
    //   localStorage.setItem('account_id', newAccount.data.id);
    //   localStorage.setItem('user_id', newAccount.data.user_id);
    //   history.push('/')
    //   yield put(responseAccountSuccess(newAccount.data, APP_MESSAGES.account.createSuccess));
    // } else if (newAccount.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
    //   yield put(responseAccountNotAcceptable(newAccount.data));
    // } else {
    //   yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
    // }
  } catch (error) {
    // yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
  }
}

/**
 * Create User
 */
const createPositionsInDB = async (positions) => {
  return await axios.post('/company/positions/save', positions)
    .then(success => console.log(success))
    .catch(error => error.response);
}

/**
 * Create Account
 */
export function* createPositions() {
  yield takeEvery(CREATE_POSITIONS, createPositionsBeforeSavingInDB);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(createPositions)
  ]);
}