import {
    GET_USER,

    RESPONSE_USER_SUCCESS,
    RESPONSE_USER_FAILURE,
    RESPONSE_USER_NOT_ACCEPTABLE,
    RESPONSE_USER_NOT_FOUND
} from './types';

/**
 * Redux Action To Get User
 */
export const getUser = (userId) => ({
    type: GET_USER,
    payload: { userId }
})

//  ----------  RESPONSE USER ------------  //

/**
 * Redux Action User Not Acceptable
 */
export const responseUserNotAcceptable = (validationMessages) => ({
    type: RESPONSE_USER_NOT_ACCEPTABLE,
    payload: validationMessages
})

/**
 * Redux Action To User Not Found
 */
export const responseUserNotFound = (message) => ({
    type: RESPONSE_USER_NOT_FOUND,
    payload: message
})

/**
 * Redux Action To Get User Not Acceptable
 */
export const responseUserFailure = (validationMessages) => ({
    type: RESPONSE_USER_FAILURE,
    payload: validationMessages
})

/**
 * Redux Action User Success
 */
export const responseUserSuccess = (user, message) => ({
    type: RESPONSE_USER_SUCCESS,
    payload: { user, message} 
});