/**
 * Account Reducers
 */
import { NotificationManager } from 'react-notifications';

/**
 * Types
 */
import {
    GET_COMPANY_INFO,
    CREATE_COMPANY_INFO,
    RESPONSE_COMPANY_SUCCESS,
    RESPONSE_COMPANY_NOT_FOUND,
    RESPONSE_COMPANY_NOT_ACCEPTABLE,
    RESPONSE_COMPANY_FAILURE
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
        case GET_COMPANY_INFO:
            return { ...state, loading: true, errorMessage: {} };

        case CREATE_COMPANY_INFO:
            return { ...state, loading: true, errorMessage: {} };

        case RESPONSE_COMPANY_SUCCESS:
            action.payload.message ? NotificationManager.success(action.payload.message) : false ;
            return { ...state, loading: false, company: action.payload };

        case RESPONSE_COMPANY_NOT_FOUND:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        case RESPONSE_COMPANY_NOT_ACCEPTABLE:
            NotificationManager.error('Check validation messages!');
            return { ...state, loading: false, errorMessage: action.payload };

        case RESPONSE_COMPANY_FAILURE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: action.payload };

        default: return { ...state };
    }
}
