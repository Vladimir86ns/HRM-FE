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
  GET_ACCOUNT,
  CREATE_ACCOUNT,
  GET_ACCOUNT_COMPANIES
} from '../actions/types';

/**
 * Account actions
 */
import {
  responseAccountSuccess,
  responseCompaniesSuccess,
  responseAccountNotFound,
  responseAccountNotAcceptable,
  responseAccountFailure
} from '../actions/index';

/**
 * Get Account
 */
function* getUserAccount({ payload }) {
  const accountId = payload.accountId;
  try {
    const account = yield call(fetchAccountFromDB, accountId);
    if (account.status === responseCodes.HTTP_OK) {
      yield put(responseAccountSuccess(account.data));
    } else if (account.status === responseCodes.HTTP_NOT_FOUND)  {
      yield put(responseAccountNotFound(account.data));
    } else if (account.status === responseCodes.HTTP_NOT_ACCEPTABLE) {
      yield put(responseAccountNotAcceptable(account.data.message));
    } else {
      yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
    }
  } catch (error) {
    yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
  }
}

/**
 * Get All Account Companies
 */
function* getAccountCompaniesFromDB({ payload }) {
  const accountId = payload.accountId;
  try {
    const companies = yield call(fetchAccountCompanies, accountId);
    if (companies.status === responseCodes.HTTP_OK) {
      yield put(responseCompaniesSuccess(companies.data.data));
    } else if (companies.status === responseCodes.HTTP_NOT_FOUND)  {
      yield put(responseAccountNotFound(companies.data));
    } else if (companies.status === responseCodes.HTTP_NOT_ACCEPTABLE) {
      yield put(responseAccountNotAcceptable(companies.data.message));
    } else {
      yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
    }
  } catch (error) {
    yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
  }
}

/**
 * Create Account
 */
function* createAccountWithNameEmailPassword({ payload }) {
  const { name, email, password } = payload.account;
  const { history } = payload
  try {
    const newAccount = yield call(createAccountWithNameEmailPasswordRequest, name, email, password);
    if (newAccount.status === responseCodes.HTTP_OK) {
      localStorage.setItem('account_id', newAccount.data.id);
      localStorage.setItem('user_id', newAccount.data.user_id);
      history.push('/')
      yield put(responseAccountSuccess(newAccount.data, APP_MESSAGES.account.createSuccess));
    } else if (newAccount.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
      yield put(responseAccountNotAcceptable(newAccount.data));
    } else {
      yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
    }
  } catch (error) {
    yield put(responseAccountFailure(APP_MESSAGES.requestFailed));
  }
}

/**
 * Fetch User Account
 */
const fetchAccountFromDB = async (accountId) => {
  return await axios.get(`/account/${accountId}`)
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Fetch Account Companies
 */
const fetchAccountCompanies = async (accountId) => {
  return await axios.get(`/account/${accountId}/companies`)
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Create User
 */
const createAccountWithNameEmailPasswordRequest = async (name, email, password) => {
  return await axios.post('/account/create', {
      name,
      email,
      password
    })
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Get Account
 */
export function* getAccount() {
  yield takeEvery(GET_ACCOUNT, getUserAccount);
}

/**
 * Get Account Companies
 */
export function* getAccountCompanies() {
  yield takeEvery(GET_ACCOUNT_COMPANIES, getAccountCompaniesFromDB);
}

/**
 * Create Account
 */
export function* createNewAccount() {
  yield takeEvery(CREATE_ACCOUNT, createAccountWithNameEmailPassword);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(getAccount),
    fork(createNewAccount),
    fork(getAccountCompanies)
  ]);
}