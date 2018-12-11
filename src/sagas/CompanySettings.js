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
    const { history } = payload;


    try {
        const newAccount = yield call(saveCompanySettingsInDB, payload);
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
 * Create User
 */
const saveCompanySettingsInDB = async (payload) => {
    let {
        accountInfo,
        companyInfo,
        locationInfo,
        departmentInfo
    } = payload.company;

    return await axios.post('/company/save_company_settings', {
        account_info: {
            name: accountInfo.name,
            email: accountInfo.email,
            account_id: 1
        },
        company_info: [
            {
                company: {
                    name: companyInfo.name,
                    email: companyInfo.email,
                    fax_number: companyInfo.fax_number,
                    mobile_phone: companyInfo.mobile_phone,
                    telephone_number: companyInfo.telephone_number,
                    website: companyInfo.website
                },
                location: {
                    country_id: 191,
                    region: locationInfo.region,
                    country: locationInfo.country,
                    city: locationInfo.city,
                    zip_code: locationInfo.zip_code,
                    first_address_line: locationInfo.first_address_line,
                    second_address_line: locationInfo.second_address_line
                },
                department_info: [
                    {
                        name: departmentInfo.name,
                        description: departmentInfo.description
                    }
                ]
            }
        ]
    })
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