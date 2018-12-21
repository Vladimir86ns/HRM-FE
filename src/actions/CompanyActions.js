import {
    GET_COMPANY_INFO,
    CREATE_COMPANY_INFO,
    UPDATE_COMPANY_INFO,
    RESPONSE_COMPANY_SUCCESS,
    RESPONSE_COMPANY_NOT_FOUND,
    RESPONSE_COMPANY_NOT_ACCEPTABLE,
    RESPONSE_COMPANY_FAILURE
} from './types';

/**
 * Redux Action To Get Company Info
 */
export const getCompanyInfo = (companyId) => ({
    type: GET_COMPANY_INFO,
    payload: { companyId }
});

/**
 * Redux Action To Create Company Info
 */
export const createCompanyInfo = (company, history) => ({
    type: CREATE_COMPANY_INFO,
    payload: { company, history }
});

/**
 * Redux Action To Update Company Info
 */
export const updateCompanyInfo = (company, companyId) => ({
    type: UPDATE_COMPANY_INFO,
    payload: { company, history, companyId }
});

//  ----------  RESPONSE COMPANY ------------  //

/**
 * Redux Action To Company Success
 */
export const responseCompanySuccess = (company, message) => ({
    type: RESPONSE_COMPANY_SUCCESS,
    payload: { company, message }
});

/**
 * Redux Action To Company Not Found
 */
export const responseCompanyNotFound = (message) => ({
    type: RESPONSE_COMPANY_NOT_FOUND,
    payload: message
});

/**
 * Redux Action To Company Not Acceptable
 */
export const responseCompanyNotAcceptable = (fieldValidationMessages, validationMessage) => {
    return {
        type: RESPONSE_COMPANY_NOT_ACCEPTABLE,
        payload: { fieldValidationMessages, validationMessage }
    }
};

/**
 * Redux Action To Company Failure
 */
export const responseCompanyFailure = (validationMessage) => {
    return {
        type: RESPONSE_COMPANY_FAILURE,
        payload: validationMessage
    }
};

