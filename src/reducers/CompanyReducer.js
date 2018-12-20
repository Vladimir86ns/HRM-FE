/**
 * Account Reducers
 */
import { NotificationManager } from 'react-notifications';

/**
 * Types
 */
import {
    CREATE_COMPANY_INFO,
    RESPONSE_COMPANY_SUCCESS,
    RESPONSE_COMPANY_FAILURE,
    RESPONSE_COMPANY_NOT_ACCEPTABLE
} from '../actions/types';

/**
 * initial company
 */
const INIT_STATE = {
    company: {},
    errorMessage: {},
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CREATE_COMPANY_INFO:
            return { ...state, loading: true, errorMessage: {} };

        case RESPONSE_COMPANY_SUCCESS:
            // NotificationManager.success('Account Created');
            // return { ...state, loading: false, user: action.payload.uid };

        case RESPONSE_COMPANY_FAILURE:
            // NotificationManager.error('Check validation messages!');
            return { ...state, loading: false, errorMessage: action.payload };

        case RESPONSE_COMPANY_NOT_ACCEPTABLE:
            NotificationManager.error('Check validation messages!');
            return { ...state, loading: false, errorMessage: action.payload };

        default: return { ...state };
    }
}
