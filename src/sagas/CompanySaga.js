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
 * Company types
 */
import {
    GET_COMPANY_INFO,
    CREATE_COMPANY_INFO
} from '../actions/types';

/**
 * Company actions
 */
import {
    responseCompanySuccess,
    responseCompanyNotFound,
    responseCompanyNotAcceptable,
    responseCompanyFailure,
} from '../actions/index';

/**
 * Get Company
 */
function* getCompanyFromDB({ payload }) {
    const companyId = payload.companyId;
    try {
        const company = yield call(getCompanyById, companyId);
        if (company.status === responseCodes.HTTP_OK) {
             yield put(responseCompanySuccess(company.data.data));
        } else if (company.status === responseCodes.HTTP_NOT_FOUND)  {
            yield put(responseCompanyNotFound(company.data));
        } else if (company.status === responseCodes.HTTP_NOT_ACCEPTABLE) {
            yield put(responseCompanyNotAcceptable(company.data.message));
        } else {
            yield put(responseCompanyFailure(APP_MESSAGES.requestFailed));
        }
    } catch (error) {
        yield put(responseCompanyFailure(APP_MESSAGES.requestFailed));
    }
}

/**
 * Create Company info
 */
function* createCompanySettingsInDB({ payload }) {
    const { company } = payload;

    try {
        const newCompany = yield call(saveCompanySettingsInDB, company);
        if (newCompany.status === responseCodes.HTTP_OK) {
            localStorage.setItem('company_id', newCompany.data.data.id);
            yield put(responseCompanySuccess(newCompany.data.data, APP_MESSAGES.company.createSuccess));
        } else if (newCompany.status === responseCodes.HTTP_NOT_ACCEPTABLE)  {
            let { message } = newCompany.data;
            let validationMessage = message ? message : APP_MESSAGES.validationMessage;
            yield put(responseCompanyNotAcceptable(newCompany.data, validationMessage));
        } else {
            yield put(responseCompanyFailure(APP_MESSAGES.requestFailed));
        }
    } catch (error) {
        yield put(responseCompanyFailure(APP_MESSAGES.requestFailed));
    }
}

/**
 * Get Company
 */
const getCompanyById = async (companyId) => {
    return await axios.get(`/company/${companyId}`)
        .then(success => success)
        .catch(error => error.response);
}

/**
 * Save company info
 */
const saveCompanySettingsInDB = async (data) => {
    return await axios.post('/company/save_company_settings', data)
    .then(success => success)
    .catch(error => error.response);
}

/**
 * Get Company
 */
export function* getCompany() {
    yield takeEvery(GET_COMPANY_INFO, getCompanyFromDB);
}

/**
 * Create Company
 */
export function* createCompanySettings() {
    yield takeEvery(CREATE_COMPANY_INFO, createCompanySettingsInDB);
}

/**
 * Auth Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(getCompany),
        fork(createCompanySettings)
    ]);
}
