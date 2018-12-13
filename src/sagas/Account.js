/**
 * Account Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

/**
 * Imports
*/
import axios from '../Axios-laravel';
import { responseCodes } from '../constants/ResonseCode';

/**
 * Account types
 */
import {
    CREATE_ACCOUNT,
    GET_ACCOUNT
} from '../actions/types';

/**
 * Account acctions
 */
import {
    createAccountSuccess,
    createAccountNotAcceptable,
    createAccountFailure,

    getAccountSuccess,
    getAccountNotFound,
    getAccountNotAcceptable,

    responseAccountFailure
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
            // TODO set local storage
            // TODO set successfuly account

            localStorage.setItem('account_id', newAccount.data.id);
            history.push('/')
            yield put(createAccountSuccess(newAccount.data));
        } else if (newAccount.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            yield put(createAccountNotAcceptable(newAccount.data));
        } else {
            yield put(createAccountFailure('Something went wrong!'));
        }
    } catch (error) {
        yield put(createAccountFailure('Something went wrong!'));
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
             yield put(getAccountSuccess(account.data));
        } else if (account.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            yield put(getAccountNotAcceptable(newAccount.data));
        } else if (account.status === responseCodes.HTTP_NOT_FOUND) {
            yield put(responseAccountFailure(newAccount.data));
        } else {
            yield put(responseAccountFailure('Something went wrong!'));
        }
    } catch (error) {
        yield put(responseAccountFailure('Something went wrong!'));
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