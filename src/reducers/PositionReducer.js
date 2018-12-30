/**
 * Account Reducers
 */
import { NotificationManager } from 'react-notifications';

/**
 * Types
 */
import {
    STORE_POSITIONS_BEFORE_CREATING,
    CREATE_POSITIONS,
    RESET_SHOW_ADD_POSITION_BUTTON,
    RESPONSE_POSITION_SUCCESS,
    RESPONSE_POSITION_NOT_FOUND,
    RESPONSE_POSITION_NOT_ACCEPTABLE,
    RESPONSE_POSITION_FAILURE
} from '../actions/types';

/**
 * initial positions
 */
const INIT_STATE = {
    position: {},
    beforeCreatePositions: [],
    errorMessage: {},
    loading: false,
    showAddButton: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case STORE_POSITIONS_BEFORE_CREATING:
          return { ...state, loading: true, beforeCreatePositions: action.payload, showAddButton: true };

        case CREATE_POSITIONS:
            return { ...state, loading: true, errorMessage: {} };

        case RESET_SHOW_ADD_POSITION_BUTTON:
            return { ...state, loading: true, showAddButton: false };

        case RESPONSE_POSITION_SUCCESS:
            action.payload.message ? NotificationManager.success(action.payload.message) : false ;
            return { ...state, loading: false, positions: action.payload.positions };

        case RESPONSE_POSITION_NOT_FOUND:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        case RESPONSE_POSITION_NOT_ACCEPTABLE:
            NotificationManager.error('Check Validation Messages!');
            return { ...state, loading: false, errorMessage: action.payload };

        case RESPONSE_POSITION_FAILURE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, errorMessage: {} };

        default: return { ...state };
    }
}