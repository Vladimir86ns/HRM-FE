/**
 * Positions Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

/**
 * Imports
*/
import axios from '../Axios-laravel';
import { responseCodes } from '../constants/ResponseCode';
import APP_MESSAGES from '../../src/constants/AppMessages';

/**
 * Positions types
 */
import {
  GET_COMPANY_POSITIONS,
  GET_COMPANY_POSITIONS_BY_PAGE,
  CREATE_POSITIONS
} from '../actions/types';

/**
 * Positions actions
 */
import {
  resetStorePositionsBeforeCreating,
  responsePositionSuccess,
  responsePositionGetSuccess,
  responsePositionNotFound,
  responsePositionNotAcceptable,
  responsePositionFailure
} from '../actions/index';

/**
 * Get Company Positions.
 */
function* getCompanyPositionsFromServer({ payload }) {
  const companyId = payload.companyId;
  try {
    const response = yield call(getPositionsRequest, companyId);

    if (response.status === responseCodes.HTTP_OK) {
      yield put(responsePositionGetSuccess(response.data.data, response.data.meta.pagination));
    } else if (response.status === responseCodes.HTTP_NOT_FOUND)  {
      yield put(responsePositionNotFound(response.data.message));
    } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
      yield put(responsePositionNotAcceptable(response.data));
    } else {
      yield put(responsePositionFailure(APP_MESSAGES.requestFailed));
    }
  } catch (error) {
    yield put(responsePositionFailure(APP_MESSAGES.requestFailed));
  }
}

/**
 * Get Company Positions By Page.
 */
function* getCompanyPositionsByPageFromServer({ payload }) {
  const { companyId, pageNumber } = payload;
  try {
    const response = yield call(getPositionsByPageRequest, companyId, pageNumber);

    if (response.status === responseCodes.HTTP_OK) {
      yield put(responsePositionGetSuccess(response.data.data, response.data.meta.pagination));
    } else if (response.status === responseCodes.HTTP_NOT_FOUND)  {
      yield put(responsePositionNotFound(response.data.message));
    } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
      yield put(responsePositionNotAcceptable(response.data));
    } else {
      yield put(responsePositionFailure(APP_MESSAGES.requestFailed));
    }
  } catch (error) {
    yield put(responsePositionFailure(APP_MESSAGES.requestFailed));
  }
}

/**
 * Create Positions
 */
function* createPositionsToServer({ payload }) {
  try {
    let { history, positions, companyId, accountId} = payload;

    const response = yield call(createPositionsRequest, positions, companyId, accountId);
    if (response.status === responseCodes.HTTP_OK) {
      // TODO ADD REDIRECTION FOR ALL POSITIONS
      history.push('/app/tables/position-table');
      yield put(responsePositionSuccess(response.data, APP_MESSAGES.positions.createSuccess));
      yield put(resetStorePositionsBeforeCreating());
    } else if (response.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
      yield put(responsePositionNotAcceptable(response.data));
    } else {
      yield put(responsePositionFailure(APP_MESSAGES.requestFailed));
    }
  } catch (error) {
    yield put(responsePositionFailure(APP_MESSAGES.requestFailed));
  }
}

/**
 * Get Positions Request
 */
const getPositionsRequest = async (companyId) => {
  return await axios.get(`/company/${companyId}/positions/get`)
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Get Positions By page Request
 */
const getPositionsByPageRequest = async (companyId, pageNumber) => {
  return await axios.get(`/company/${companyId}/positions/get?page=${pageNumber}`)
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Create Positions
 */
const createPositionsRequest = async (positions, companyId, accountId) => {
  return await axios.post('/company/positions/save', {
    positions,
    company_id: companyId,
    account_id: accountId
  })
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Get Company Positions
 */
export function* getCompanyPositions() {
  yield takeEvery(GET_COMPANY_POSITIONS, getCompanyPositionsFromServer);
}

/**
 * Get Company Positions By Page
 */
export function* getCompanyPositionsByPage() {
  yield takeEvery(GET_COMPANY_POSITIONS_BY_PAGE, getCompanyPositionsByPageFromServer);
}

/**
 * Create Positions
 */
export function* createPositions() {
  yield takeEvery(CREATE_POSITIONS, createPositionsToServer);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(getCompanyPositions),
    fork(getCompanyPositionsByPage),
    fork(createPositions)
  ]);
}