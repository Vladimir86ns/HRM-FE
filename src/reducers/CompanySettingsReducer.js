/**
 * Account Reducers
 */
import { NotificationManager } from 'react-notifications';

/**
 * Types
 */
import {
    CREATE_COMPANY_SETTINGS,
    CREATE_COMPANY_SETTINGS_SUCCESS,
    CREATE_COMPANY_SETTINGS_FAILURE,
    CREATE_COMPANY_SETTINGS_NOT_ACCEPTABLE
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
        case CREATE_COMPANY_SETTINGS:
            return { ...state, loading: true, errorMessage: {} };

        case CREATE_COMPANY_SETTINGS_SUCCESS:
            // NotificationManager.success('Account Created');
            // return { ...state, loading: false, user: action.payload.uid };

        case CREATE_COMPANY_SETTINGS_FAILURE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        case CREATE_COMPANY_SETTINGS_NOT_ACCEPTABLE:
            // NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: action.payload };

        default: return { ...state };
    }
}