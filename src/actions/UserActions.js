import {
    GET_USER,
    UPDATE_USER_PROFILE,
    RESPONSE_USER_SUCCESS,
    RESPONSE_USER_NOT_FOUND,
    RESPONSE_USER_NOT_ACCEPTABLE,
    RESPONSE_USER_FAILURE
} from './types';

/**
 * Redux Action To Get User
 */
export const getUser = (userId) => ({
    type: GET_USER,
    payload: { userId }
})

/**
 * Redux Action To Update User profile
 */
export const updateUserProfile = (userData, userId) => ({
    type: UPDATE_USER_PROFILE,
    payload: { userData, userId }
})

//  ----------  RESPONSE USER ------------  //

/**
 * Redux Action User Success
 */
export const responseUserSuccess = (user, message) => ({
    type: RESPONSE_USER_SUCCESS,
    payload: { user, message} 
});

/**
 * Redux Action To User Not Found
 */
export const responseUserNotFound = (message) => ({
    type: RESPONSE_USER_NOT_FOUND,
    payload: message
});

/**
 * Redux Action User Not Acceptable
 */
export const responseUserNotAcceptable = (fieldValidationMessages, validationMessage) => ({
    type: RESPONSE_USER_NOT_ACCEPTABLE,
    payload: { fieldValidationMessages, validationMessage }
});

/**
 * Redux Action To User Not Acceptable
 */
export const responseUserFailure = (validationMessages) => ({
    type: RESPONSE_USER_FAILURE,
    payload: validationMessages
});