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
 * Create Company settings
 */
function* createCompanySettingsInDB({ payload }) {
    const { history , company} = payload;

    try {
        const newAccount = yield call(saveCompanySettingsInDB, company);
        // if (newAccount.status === responseCodes.HTTP_OK) {
        //     // TODO set local storage
        //     // TODO set successfuly account

        //     // yield put(createAccountSuccess(newAccount.data));
        //     history.push('/')
        //     yield put(createAccountNotAcceptable(newAccount.data));
        // } else if (newAccount.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
        //     yield put(createAccountNotAcceptable(newAccount.data));
        // } else {
        //     yield put(createAccountFailure('Something went wrong!'));
        // }
    } catch (error) {
        // yield put(createAccountFailure('Something went wrong!'));
    }
}

/**
 * Save company settings
 */
const saveCompanySettingsInDB = async (data) => {
    return await axios.post('/company/save_company_settings', data)
    .then(success => console.log(success.data))
    .catch(error => console.log(error.response));
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