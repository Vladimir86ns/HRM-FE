/**
 * Account Reducers
 */
import { NotificationManager } from 'react-notifications';

/**
 * Types
 */
import {
    GET_USER,
    UPDATE_USER_PROFILE,
    RESPONSE_USER_SUCCESS,
    RESPONSE_USER_NOT_FOUND,
    RESPONSE_USER_NOT_ACCEPTABLE,
    RESPONSE_USER_FAILURE
} from '../actions/types';

/**
 * initial account
 */
const INIT_STATE = {
    user: {},
    errorMessage: {},
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_USER:
            return { ...state, loading: true, errorMessage: {} };
        
        case UPDATE_USER_PROFILE:
            return { ...state, loading: true, errorMessage: {} };

        case RESPONSE_USER_SUCCESS:
            action.payload.message ? NotificationManager.success(action.payload.message) : false ;
            return { ...state, loading: false, user: action.payload.user };

        case RESPONSE_USER_NOT_FOUND:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        case RESPONSE_USER_NOT_ACCEPTABLE:
            NotificationManager.error(action.payload.validationMessage);
            return { ...state, loading: false, errorMessage: action.payload.fieldValidationMessages };

        case RESPONSE_USER_FAILURE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        default: return { ...state };
    }
}