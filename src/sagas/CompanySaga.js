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
 * Company types
 */
import {
  GET_COMPANY_INFO,
  CREATE_COMPANY_INFO,
  UPDATE_COMPANY_INFO
} from '../actions/types';

/**
 * Company actions
 */
import {
  responseCompanySuccess,
  responseCompanyNotFound,
  responseCompanyNotAcceptable,
  responseCompanyFailure,
} from '../actions/index';

/**
 * Get Company
 */
function* getCompanyFromDB({ payload }) {
  const companyId = payload.companyId;
  try {
    const company = yield call(getCompanyById, companyId);
    if (company.status === responseCodes.HTTP_OK) {
      yield put(responseCompanySuccess(company.data.data));
    } else if (company.status === responseCodes.HTTP_NOT_FOUND)  {
      yield put(responseCompanyNotFound(company.data.message));
    } else if (company.status === responseCodes.HTTP_NOT_ACCEPTABLE) {
      yield put(responseCompanyNotAcceptable(company.data.message));
    } else {
      yield put(responseCompanyFailure(APP_MESSAGES.requestFailed));
    }
  } catch (error) {
    yield put(responseCompanyFailure(APP_MESSAGES.requestFailed));
  }
}

/**
* Create Company info
*/
function* createCompanySettingsInDB({ payload }) {
  const { company } = payload;

  try {
    const newCompany = yield call(saveCompanySettingsInDB, company);
    if (newCompany.status === responseCodes.HTTP_OK) {
      localStorage.setItem('company_id', newCompany.data.data.id);
      yield put(responseCompanySuccess(newCompany.data.data, APP_MESSAGES.company.createSuccess));
    } else if (newCompany.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
      let { message } = newCompany.data;
      let validationMessage = message ? message : APP_MESSAGES.validationMessage;
      yield put(responseCompanyNotAcceptable(newCompany.data, validationMessage));
    } else {
      yield put(responseCompanyFailure(APP_MESSAGES.requestFailed));
    }
  } catch (error) {
    yield put(responseCompanyFailure(APP_MESSAGES.requestFailed));
  }
}

/**
 * Update Company info
 */
function* updateCompanyInfoDB({ payload }) {
  const { company, companyId } = payload;

  try {
    const updatedCompany = yield call(updateCompanyInfoInDB, company, companyId);
    if (updatedCompany.status === responseCodes.HTTP_OK) {
      yield put(responseCompanySuccess(updatedCompany.data.data, APP_MESSAGES.company.updateSuccess));
    } else if (updatedCompany.status === responseCodes.HTTP_NOT_FOUND)  {
      yield put(responseCompanyNotFound(updatedCompany.data.message));
    } else if (updatedCompany.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
      let { message } = updatedCompany.data;
      let validationMessage = message ? message : APP_MESSAGES.validationMessage;
      yield put(responseCompanyNotAcceptable(updatedCompany.data, validationMessage));
    } else {
      yield put(responseCompanyFailure(APP_MESSAGES.requestFailed));
    }
  } catch (error) {
    yield put(responseCompanyFailure(APP_MESSAGES.requestFailed));
  }
}

/**
 * Get Company
 */
const getCompanyById = async (companyId) => {
  return await axios.get(`/company/${companyId}`)
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Save company info
 */
const saveCompanySettingsInDB = async (data) => {
  return await axios.post('/company/save_company_settings', data)
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Update company info
 */
const updateCompanyInfoInDB = async (data, companyId) => {
  return await axios.patch(`/company/${companyId}`, data)
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Get Company
 */
export function* getCompany() {
  yield takeEvery(GET_COMPANY_INFO, getCompanyFromDB);
}

/**
 * Create Company
 */
export function* createCompanyInfo() {
  yield takeEvery(CREATE_COMPANY_INFO, createCompanySettingsInDB);
}

/**
 * Update Company
 */
export function* updateCompanyInfo() {
  yield takeEvery(UPDATE_COMPANY_INFO, updateCompanyInfoDB);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(getCompany),
    fork(createCompanyInfo),
    fork(updateCompanyInfo)
  ]);
}
