import {
    CREATE_ACCOUNT,
    CREATE_ACCOUNT_NOT_ACCEPTABLE,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAILURE,

    GET_ACCOUNT,
    GET_ACCOUNT_NOT_ACCEPTABLE,
    GET_ACCOUNT_SUCCESS,

    RESPONSE_ACCOUNT_FAILURE
} from './types';

//  ----------  GET ACCOUNT ------------  //

/**
 * Redux Action To Get Account
 */
export const getAccount = (accountId) => ({
    type: GET_ACCOUNT,
    payload: { accountId }
})

/**
 * Redux Action To Get Account Success
 */
export const getAccountSuccess = (account) => ({
    type: GET_ACCOUNT_SUCCESS,
    payload: account 
});

/**
 * Redux Action To Get Account Not Found
 */
export const getAccountNotFound = (account) => ({
    type: GET_ACCOUNT_NOT_FOUND,
    payload: account
})

/**
 * Redux Action To Get Account Not Acceptable
 */
export const getAccountNotAcceptable = (account) => ({
    type: GET_ACCOUNT_NOT_ACCEPTABLE,
    payload: { account }
})

//  ----------  CREATE ACCOUNT ------------  //

/**
 * Redux Action To Create Account
 */
export const createAccount = (account, history) => ({
    type: CREATE_ACCOUNT,
    payload: { account, history }
})

/**
 * Redux Action To Create Account Success
 */
export const createAccountSuccess = (account) => ({
    type: CREATE_ACCOUNT_SUCCESS,
    payload: account
});

/**
 * Redux Action To Create Account Not Acceptable
 */
export const createAccountNotAcceptable = (error) => {
    return {
        type: CREATE_ACCOUNT_NOT_ACCEPTABLE,
        payload: error
    }
};

/**
 * Redux Action To Create Account Failure
 */
export const createAccountFailure = (error) => {
    return {
        type: CREATE_ACCOUNT_FAILURE,
        payload: error
    }
};

//  ----------  RESPONSE ACCOUNT FAILURE ------------  //

/**
 * Redux Action To Get Account Not Acceptable
 */
export const responseAccountFailure = (account) => ({
    type: RESPONSE_ACCOUNT_FAILURE,
    payload: { account }
})