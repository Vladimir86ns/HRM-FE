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
    CREATE_ACCOUNT_SUCCESS
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

        case CREATE_ACCOUNT_SUCCESS:
            NotificationManager.success('Account Created');
            return { ...state, loading: false, account: action.payload };

        case CREATE_ACCOUNT_NOT_ACCEPTABLE:
            // NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: action.payload };

        case CREATE_ACCOUNT_FAILURE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        default: return { ...state };
    }
}