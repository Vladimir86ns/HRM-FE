/**
 * Account Reducers
 */
import { NotificationManager } from 'react-notifications';

/**
 * Types
 */
import {
    CREATE_ACCOUNT,
    CREATE_ACCOUNT_FAILURE,
    CREATE_ACCOUNT_NOT_ACCEPTABLE,
    CREATE_ACCOUNT_SUCCESS,

    GET_ACCOUNT,
    GET_ACCOUNT_NOT_ACCEPTABLE,
    GET_ACCOUNT_NOT_FOUND,
    GET_ACCOUNT_SUCCESS,

    RESPONSE_ACCOUNT_FAILURE
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

        // ------ CREATE ------- //
        case CREATE_ACCOUNT:
            return { ...state, loading: true, errorMessage: {} };

        case CREATE_ACCOUNT_SUCCESS:
            NotificationManager.success('Account Created');
            return { ...state, loading: false, account: action.payload };

        case CREATE_ACCOUNT_NOT_ACCEPTABLE:
            NotificationManager.error('Check Validation Messages!');
            return { ...state, loading: false, errorMessage: action.payload };

        case CREATE_ACCOUNT_FAILURE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        // ------ GET ------- //
        case GET_ACCOUNT:
            console.log('GET_ACCOUNT');
            return { ...state, loading: true, errorMessage: {} };

        case GET_ACCOUNT_SUCCESS:
            console.log('GET_ACCOUNT_SUCCESS');
            return { ...state, loading: false, account: action.payload };

        case GET_ACCOUNT_NOT_ACCEPTABLE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        case GET_ACCOUNT_NOT_FOUND:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        // ------ RESPONSE FAILURE ------- //
        case RESPONSE_ACCOUNT_FAILURE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        default: return { ...state };
    }
}