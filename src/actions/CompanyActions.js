import {
    GET_COMPANY_INFO,
    CREATE_COMPANY_INFO,
    RESPONSE_COMPANY_FAILURE,
    RESPONSE_COMPANY_SUCCESS,
    RESPONSE_COMPANY_NOT_ACCEPTABLE,
    RESPONSE_COMPANY_NOT_FOUND
} from './types';

/**
 * Redux Action To Get Company Settings
 */
export const getCompanyInfo = (companyId) => ({
    type: GET_COMPANY_INFO,
    payload: { companyId }
})

/**
 * Redux Action To Create Company Settings
 */
export const companyActions = (company, history) => ({
    type: CREATE_COMPANY_INFO,
    payload: { company, history }
})

//  ----------  RESPONSE ACCOUNT ------------  //

/**
 * Redux Action To Company Success
 */
export const responseCompanySuccess = (company) => ({
    type: RESPONSE_COMPANY_SUCCESS,
    payload: company
});

/**
 * Redux Action To Company Failure
 */
export const responseCompanyFailure = (validationMessage) => {
    return {
        type: RESPONSE_COMPANY_FAILURE,
        payload: validationMessage
    }
};

/**
 * Redux Action To Company Not Acceptable
 */
export const responseCompanyNotAcceptable = (validationMessages) => {
    return {
        type: RESPONSE_COMPANY_NOT_ACCEPTABLE,
        payload: validationMessages
    }
};

/**
 * Redux Action To Company Not Found
 */
export const responseCompanyNotFound = (message) => ({
    type: RESPONSE_COMPANY_NOT_FOUND,
    payload: message
})
