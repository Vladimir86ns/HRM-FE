/**
 * Account Reducers
 */
import { NotificationManager } from 'react-notifications';

/**
 * Types
 */
import {
    GET_USER,

    RESPONSE_USER_FAILURE,
    RESPONSE_USER_NOT_ACCEPTABLE,
    RESPONSE_USER_NOT_FOUND,
    RESPONSE_USER_SUCCESS
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

        // ------ RESPONSE FAILURE ------- //
        case RESPONSE_USER_SUCCESS:
            action.payload.message ? NotificationManager.success(action.payload.message) : false ;
            return { ...state, loading: false, user: action.payload.user };

        case RESPONSE_USER_NOT_FOUND:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        case RESPONSE_USER_FAILURE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        case RESPONSE_USER_NOT_ACCEPTABLE:
            NotificationManager.error('Check Validation Messages!');
            return { ...state, loading: false, errorMessage: action.payload };

        default: return { ...state };
    }
}