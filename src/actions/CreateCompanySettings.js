import {
    CREATE_COMPANY_SETTINGS,
    CREATE_COMPANY_SETTINGS_FAILURE,
    CREATE_COMPANY_SETTINGS_SUCCESS,
    CREATE_COMPANY_SETTINGS_NOT_ACCEPTABLE
} from './types';

/**
 * Redux Action To Create Company Settings
 */
export const createCompanySettings = (company, history) => ({
    type: CREATE_COMPANY_SETTINGS,
    payload: { company, history }
})

/**
 * Redux Action To Create Company Settings Success
 */
export const createCompanySettingsSuccess = (company) => ({
    type: CREATE_COMPANY_SETTINGS_SUCCESS,
    payload: company
});

/**
 * Redux Action To Create Company Settings Failure
 */
export const createCompanySettingsFailure = (error) => {
    return {
        type: CREATE_COMPANY_SETTINGS_FAILURE,
        payload: error
    }
};

/**
 * Redux Action To Create Company Settings Not Acceptable
 */
export const createCompanySettingsNotAcceptable = (error) => {
    return {
        type: CREATE_COMPANY_SETTINGS_NOT_ACCEPTABLE,
        payload: error
    }
};