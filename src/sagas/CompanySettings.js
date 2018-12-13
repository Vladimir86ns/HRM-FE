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
        const newCompany = yield call(saveCompanySettingsInDB, company);
        console.log('new companu', newCompany);
        if (newCompany.status === responseCodes.HTTP_OK) {
            console.log('1');
            // TODO set local storage
            // TODO set successfuly account

            // yield put(createAccountSuccess(newAccount.data));
            // history.push('/')
            // yield put(createAccountNotAcceptable(newAccount.data));
        } else if (newCompany.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            console.log('2');
            yield put(createCompanySettinsNotAcceptable(newCompany.data));
        } else {
            console.log('3');
            yield put(createCompanySettinsFailure('Something went wrong!'));
        }
    } catch (error) {
        console.log('4');
        yield put(createCompanySettinsFailure('Something went wrong!'));
    }
}

/**
 * Save company settings
 */
const saveCompanySettingsInDB = async (data) => {
    return await axios.post('/company/save_company_settings', data)
    .then(success => success)
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