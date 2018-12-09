/**
 * Account Reducers
 */
import { NotificationManager } from 'react-notifications';

import {
    CREATE_ACCOUNT,
    CREATE_ACCOUNT_FAILURE,
    CREATE_ACCOUNT_SUCCESS
} from '../actions/types';

/**
 * initial account
 */
const INIT_STATE = {
    user: {},
    account: {},
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CREATE_ACCOUNT:
            return { ...state, loading: true };

        case CREATE_ACCOUNT_SUCCESS:
            NotificationManager.success('Account Created');
            return { ...state, loading: false, user: action.payload.uid };

        case CREATE_ACCOUNT_FAILURE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false };

        default: return { ...state };
    }
}