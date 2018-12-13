/**
 * Account Reducers
 */
import { NotificationManager } from 'react-notifications';

/**
 * Types
 */
import {
    CREATE_ACCOUNT,
    GET_ACCOUNT,

    RESPONSE_ACCOUNT_FAILURE,
    RESPONSE_ACCOUNT_NOT_ACCEPTABLE,
    RESPONSE_ACCOUNT_NOT_FOUND,
    RESPONSE_ACCOUNT_SUCCESS
} from '../actions/types';

/**
 * initial account
 */
const INIT_STATE = {
    account: {},
    errorMessage: {},
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case CREATE_ACCOUNT:
            return { ...state, loading: true, errorMessage: {} };

        case GET_ACCOUNT:
            return { ...state, loading: true, errorMessage: {} };

        // ------ RESPONSE FAILURE ------- //
        case RESPONSE_ACCOUNT_SUCCESS:
            action.payload.message ? NotificationManager.success(action.payload.message) : false ;
            return { ...state, loading: false, account: action.payload.account };

        case RESPONSE_ACCOUNT_NOT_FOUND:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        case RESPONSE_ACCOUNT_FAILURE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        case RESPONSE_ACCOUNT_NOT_ACCEPTABLE:
            NotificationManager.error('Check Validation Messages!');
            return { ...state, loading: false, errorMessage: action.payload };

        default: return { ...state };
    }
}