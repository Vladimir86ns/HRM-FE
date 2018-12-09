import {
    CREATE_ACCOUNT,
    CREATE_ACCOUNT_FAILURE,
    CREATE_ACCOUNT_SUCCESS
} from './types';

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
 * Redux Action To Create Account Failure
 */
export const createAccountFailure = (error) => ({
    type: CREATE_ACCOUNT_FAILURE,
    payload: error
});