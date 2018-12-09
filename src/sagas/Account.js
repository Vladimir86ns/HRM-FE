/**
 * Account Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

/**
 * Imports
 */

 import axios from '../Axios-laravel';

/**
 * Account types
 */
import {
    CREATE_ACCOUNT
} from '../actions/types';

/**
 * Account acctions
 */
import {
    createAccountFailure,
    createAccountSuccess
} from '../actions/index';

/**
 * Create Account
 */
function* createAccountWithNameEmailPassword({ payload }) {
    const { name, email, password } = payload.account;
    const { history } = payload
    try {
        const newAccount = yield call(createAccountWithNameEmailPasswordRequest, name, email, password);
        console.log(newAccount);
        if (signUpUser.status === 406) {
            // TODO MAKE FUNCTION TO ACCEPT ERROR MESSAGES
            console.log(newAccount.data);

            // yield put(createAccountFailure(newAccount.message));
        } else {
            // TODO set local storage
            // TODO set successfuly account
            console.log(newAccount.data);

            // localStorage.setItem('user_id', signUpUser.uid);
            // yield put(createAccountSuccess(newAccount.data));
            history.push('/')
        }
    } catch (error) {
        yield put(createAccountFailure(error));
    }
}

/**
 * Create User
 */
const createAccountWithNameEmailPasswordRequest = async (name, email, password) => {
    console.log('OVDE SADA AXIOS REQUEST');
    return await axios.post('/account/create', {
        name,
        email,
        password
    })
    .then(success => success.data)
    .catch(error => error.response);
    // await auth.createUserWithEmailAndPassword(email, password)
    //     .then(authUser => authUser)
    //     .catch(error => error);
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
        fork(createNewAccount)
    ]);
}