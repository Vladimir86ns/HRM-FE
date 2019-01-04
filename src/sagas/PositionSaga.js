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
  CREATE_POSITIONS
} from '../actions/types';

/**
 * Positions actions
 */
import {
  resetStorePositionsBeforeCreating,
  responsePositionSuccess,
  responsePositionNotAcceptable,
  responsePositionFailure
} from '../actions/index';

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
    fork(createPositions)
  ]);
}