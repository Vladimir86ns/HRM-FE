/**
 * Account Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

/**
 * Imports
*/
import axios from '../Axios-laravel';
import { responseCodes } from '../constants/ResponseCode';

/**
 * Account types
 */
import {
    CREATE_ACCOUNT,
    GET_ACCOUNT
} from '../actions/types';

/**
 * Account actions
 */
import {
    responseAccountSuccess,
    responseAccountNotAcceptable,
    responseAccountFailure,
    responseAccountNotFound
} from '../actions/index';

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
            yield put(responseAccountSuccess(newAccount.data, 'Account created successfully!'));
        } else if (newAccount.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            yield put(responseAccountNotAcceptable(newAccount.data));
        } else {
            yield put(responseAccountFailure('Something went wrong!'));
        }
    } catch (error) {
        yield put(responseAccountFailure('Something went wrong!'));
    }
}

/**
 * Create Account
 */
function* getUserAccount({ payload }) {
    const accountId = payload.accountId;
    try {
        const account = yield call(getAccountFromDB, accountId);
        if (account.status === responseCodes.HTTP_OK) {
             yield put(responseAccountSuccess(account.data));
        } else if (account.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            yield put(responseAccountNotAcceptable(account.data));
        } else if (account.status === responseCodes.HTTP_NOT_FOUND) {
            yield put(responseAccountNotFound(account.data.message));
        } else {
            yield put(responseAccountNotFound('Something went wrong!'));
        }
    } catch (error) {
        yield put(responseAccountNotFound('Something went wrong!'));
    }
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
 * Get User Account
 */
const getAccountFromDB = async (accountId) => {
    return await axios.get(`/account/${accountId}`)
        .then(success => success)
        .catch(error => error.response);
}

/**
 * Create Account
 */
export function* createNewAccount() {
    yield takeEvery(CREATE_ACCOUNT, createAccountWithNameEmailPassword);
}

/**
 * Get Account
 */
export function* getAccount() {
    yield takeEvery(GET_ACCOUNT, getUserAccount);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(createNewAccount),
        fork(getAccount)
    ]);
}