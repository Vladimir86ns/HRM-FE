/**
 * Positions Sagas.
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

/**
 * Imports.
*/
import axios from '../Axios-laravel';
import { responseCodes } from '../constants/ResponseCode';
import APP_MESSAGES from '../../src/constants/AppMessages';

import { NotificationManager } from 'react-notifications';

/**
 * Positions types.
 */
import {
  GET_COMPANY_POSITIONS,
  GET_COMPANY_POSITIONS_BY_PAGE,
  CREATE_POSITIONS,
  DELETE_POSITION
} from '../actions/types';

/**
 * Positions actions.
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
 * Get company positions.
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
 * Get company positions by page.
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
 * Create positions.
 */
function* createPositionsToServer({ payload }) {
  try {
    let { history, positions, companyId, accountId} = payload;

    const response = yield call(createPositionsRequest, positions, companyId, accountId);
    if (response.status === responseCodes.HTTP_OK) {
      // TODO ADD REDIRECTION FOR ALL POSITIONS
      history.push('/app/tables/position-table');
      yield put(responsePositionSuccess(response.data.data, APP_MESSAGES.positions.createSuccess));
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
 * Delete positions.
 */
function* deletePositionsFromServer({ payload }) {
  const { companyId, positionId, positionName } = payload;
  try {
    const response = yield call(deletePositionsRequest, companyId, positionId);

    if (response.status === responseCodes.HTTP_OK) {
      NotificationManager.success(APP_MESSAGES.positions.delete + ` : "${positionName}"!` );
      yield put(responsePositionGetSuccess(response.data.data, response.data.meta.pagination));
    } else if (response.status === responseCodes.HTTP_NOT_FOUND)  {
      yield put(responsePositionNotFound(response.data.message));
    } else {
      yield put(responsePositionFailure(APP_MESSAGES.requestFailed));
    }
  } catch (error) {
    yield put(responsePositionFailure(APP_MESSAGES.requestFailed));
  }
}

/**
 * Get positions request.
 */
const getPositionsRequest = async (companyId) => {
  return await axios.get(`/company/${companyId}/positions/get`)
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Get positions by page request.
 */
const getPositionsByPageRequest = async (companyId, pageNumber) => {
  return await axios.get(`/company/${companyId}/positions/get?page=${pageNumber}`)
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Create positions.
 */
const createPositionsRequest = async (positions, companyId, accountId) => {
  return await axios.post(`/company/${companyId}/positions/save`, {
    positions,
    company_id: companyId,
    account_id: accountId
  })
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Delete positions.
 */
const deletePositionsRequest = async (companyId, positionId) => {
  return await axios.get(`/company/${companyId}/position/${positionId}/delete`)
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Get company positions.
 */
export function* getCompanyPositions() {
  yield takeEvery(GET_COMPANY_POSITIONS, getCompanyPositionsFromServer);
}

/**
 * Get company positions by page.
 */
export function* getCompanyPositionsByPage() {
  yield takeEvery(GET_COMPANY_POSITIONS_BY_PAGE, getCompanyPositionsByPageFromServer);
}

/**
 * Create positions.
 */
export function* createPositions() {
  yield takeEvery(CREATE_POSITIONS, createPositionsToServer);
}

/**
 * Delete positions.
 */
export function* deletePosition() {
  yield takeEvery(DELETE_POSITION, deletePositionsFromServer);
}

/**
 * Auth root saga.
 */
export default function* rootSaga() {
  yield all([
    fork(getCompanyPositions),
    fork(getCompanyPositionsByPage),
    fork(createPositions),
    fork(deletePosition)
  ]);
}