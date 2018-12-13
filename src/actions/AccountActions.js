import {
    CREATE_ACCOUNT,
    GET_ACCOUNT,

    RESPONSE_ACCOUNT_SUCCESS,
    RESPONSE_ACCOUNT_FAILURE,
    RESPONSE_ACCOUNT_NOT_ACCEPTABLE,
    RESPONSE_ACCOUNT_NOT_FOUND
} from './types';

//  ----------  GET ACCOUNT ------------  //

/**
 * Redux Action To Get Account
 */
export const getAccount = (accountId) => ({
    type: GET_ACCOUNT,
    payload: { accountId }
})

//  ----------  CREATE ACCOUNT ------------  //

/**
 * Redux Action To Create Account
 */
export const createAccount = (account, history) => ({
    type: CREATE_ACCOUNT,
    payload: { account, history }
})

//  ----------  RESPONSE ACCOUNT ------------  //

/**
 * Redux Action Account Not Acceptable
 */
export const responseAccountNotAcceptable = (validationMessages) => ({
    type: RESPONSE_ACCOUNT_NOT_ACCEPTABLE,
    payload: validationMessages
})

/**
 * Redux Action To Account Not Found
 */
export const responseAccountNotFound = (account) => ({
    type: RESPONSE_ACCOUNT_NOT_FOUND,
    payload: account
})

/**
 * Redux Action To Get Account Not Acceptable
 */
export const responseAccountFailure = (validationMessages) => ({
    type: RESPONSE_ACCOUNT_FAILURE,
    payload: validationMessages
})

/**
 * Redux Action Account Success
 */
export const responseAccountSuccess = (account, message) => ({
    type: RESPONSE_ACCOUNT_SUCCESS,
    payload: { account, message} 
});