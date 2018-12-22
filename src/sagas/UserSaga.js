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
  GET_USER,
  UPDATE_USER_PROFILE
} from '../actions/types';

/**
 * user actions
 */
import {
  responseUserSuccess,
  responseUserNotFound,
  responseUserNotAcceptable,
  responseUserFailure
} from '../actions/index';

/**
 * Get User
 */
function* getUserFromDB({ payload }) {
  const userId = payload.userId;
  try {
    const user = yield call(fetchUserFromDB, userId);
    if (user.status === responseCodes.HTTP_OK) {
      yield put(responseUserSuccess(user.data.data));
    } else if (user.status === responseCodes.HTTP_NOT_FOUND)  {
      yield put(responseUserNotFound(user.data));
    } else if (user.status === responseCodes.HTTP_NOT_ACCEPTABLE) {
      yield put(responseUserNotAcceptable(user.data.message));
    } else {
      yield put(responseUserFailure(APP_MESSAGES.requestFailed));
    }
  } catch (error) {
    yield put(responseUserFailure(APP_MESSAGES.requestFailed));
  }
}

/**
 * Update Company info
 */
function* updateUserProfileInDB({ payload }) {
  const { userData, userId } = payload;

  try {
    const updatedUserProfile = yield call(updateUserProfileDB, userData, userId);
    if (updatedUserProfile.status === responseCodes.HTTP_OK) {
      yield put(responseUserSuccess(updatedUserProfile.data.data, APP_MESSAGES.updateSuccess));
    } else if (updatedUserProfile.status === responseCodes.HTTP_NOT_FOUND)  {
      yield put(responseUserNotFound(updatedUserProfile.data.message));
    } else if (updatedUserProfile.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
      let { message } = updatedUserProfile.data;
      let validationMessage = message ? message : APP_MESSAGES.validationMessage;
      yield put(responseUserNotAcceptable(updatedUserProfile.data, validationMessage));
    } else {
      yield put(responseUserFailure(APP_MESSAGES.requestFailed));
    }
  } catch (error) {
    yield put(responseUserFailure(APP_MESSAGES.requestFailed));
  }
}

/**
 * Get User
 */
const fetchUserFromDB = async (userId) => {
  return await axios.get(`/user/${userId}`)
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Update User Profile Info
 */
const updateUserProfileDB = async (data, userId) => {
  return await axios.patch(`/user/${userId}/update`, data)
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Get User
 */
export function* getUser() {
  yield takeEvery(GET_USER, getUserFromDB);
}

/**
 * Update User
 */
export function* updateUser() {
  yield takeEvery(UPDATE_USER_PROFILE, updateUserProfileInDB);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
  yield all([
    fork(getUser),
    fork(updateUser)
  ]);
}