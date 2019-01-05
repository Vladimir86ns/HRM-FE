/**
 * Account Reducers
 */
import { NotificationManager } from 'react-notifications';

/**
 * Types
 */
import {
  GET_COMPANY_POSITIONS,
  GET_COMPANY_POSITIONS_BY_PAGE,
  STORE_POSITIONS_BEFORE_CREATING,
  CREATE_POSITIONS,
  RESET_SHOW_ADD_POSITION_BUTTON,
  RESET_STORE_POSITIONS_BEFORE_CREATING,
  RESPONSE_POSITION_SUCCESS,
  RESPONSE_POSITION_GET_SUCCESS,
  RESPONSE_POSITION_NOT_FOUND,
  RESPONSE_POSITION_NOT_ACCEPTABLE,
  RESPONSE_POSITION_FAILURE
} from '../actions/types';

/**
 * initial positions
 */
const INIT_STATE = {
  positions: [],
  beforeCreatePositions: [],
  errorMessage: {},
  paginationMeta: {},
  loading: false,
  showAddButton: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANY_POSITIONS:
      return { ...state, loading: true, errorMessage: {} };

    case GET_COMPANY_POSITIONS_BY_PAGE:
      return { ...state, loading: true, errorMessage: {} };

    case CREATE_POSITIONS:
      return { ...state, loading: true, errorMessage: {} };

    case STORE_POSITIONS_BEFORE_CREATING:
      return { ...state, loading: true, beforeCreatePositions: action.payload, showAddButton: true };

    case RESET_SHOW_ADD_POSITION_BUTTON:
      return { ...state, loading: true, showAddButton: false };

    case RESET_STORE_POSITIONS_BEFORE_CREATING:
      return { ...state, loading: true, showAddButton: false, beforeCreatePositions: [] };

    case RESPONSE_POSITION_SUCCESS:
      action.payload.message ? NotificationManager.success(action.payload.message) : false ;
      return { ...state, loading: false, positions: action.payload.positions };

    case RESPONSE_POSITION_GET_SUCCESS:
      return { ...state, loading: false, positions: action.payload.positions, paginationMeta: action.payload.paginationMeta  };

    case RESPONSE_POSITION_NOT_FOUND:
      NotificationManager.error(action.payload);
      return { ...state, loading: false, errorMessage: {} };

    case RESPONSE_POSITION_NOT_ACCEPTABLE:
      if (action.payload.message) {
        NotificationManager.error(action.payload.message);
      } else {
        NotificationManager.error('Check Validation Messages!');
      }
      return { ...state, loading: false, errorMessage: action.payload };

    case RESPONSE_POSITION_FAILURE:
      NotificationManager.error(action.payload);
      return { ...state, loading: false, errorMessage: {} };

    default: return { ...state };
  }
}