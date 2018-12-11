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
    CREATE_COMPANY_SETTINGS
} from '../actions/types';

/**
 * Account acctions
 */
import {
    createCompanySettinsFailure,
    createCompanySettinsNotAcceptable
} from '../actions/index';

/**
 * Create Company
 */
function* createCompanySettingsInDB({ payload }) {
    console.log('createCompanySettingsInDB');
    console.log(payload);
    // const { name, email, password } = payload.company;
    // const { history } = payload;


    // try {
    //     const newAccount = yield call(createAccountWithNameEmailPasswordRequest, name, email, password);
    //     if (newAccount.status === responseCodes.HTTP_OK) {
    //         // TODO set local storage
    //         // TODO set successfuly account

    //         // yield put(createAccountSuccess(newAccount.data));
    //         history.push('/')
    //         yield put(createAccountNotAcceptable(newAccount.data));
    //     } else if (newAccount.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
    //         yield put(createAccountNotAcceptable(newAccount.data));
    //     } else {
    //         yield put(createAccountFailure('Something went wrong!'));
    //     }
    // } catch (error) {
    //     yield put(createAccountFailure('Something went wrong!'));
    // }
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
    .then(success => success.data)
    .catch(error => error.response);
}

/**
 * Create Account
 */
export function* createCompanySettings() {
    yield takeEvery(CREATE_COMPANY_SETTINGS, createCompanySettingsInDB);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(createCompanySettings)
    ]);
}