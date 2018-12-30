/**
 * Account Reducers
 */
import { NotificationManager } from 'react-notifications';

/**
 * Types
 */
import {
  GET_COMPANY_INFO,
  GET_COMPANY_EMPLOYEES,
  CREATE_COMPANY_INFO,
  UPDATE_COMPANY_INFO,
  RESPONSE_COMPANY_SUCCESS,
  RESPONSE_COMPANIES_SUCCESS,
  RESPONSE_COMPANY_SUCCESS_ALL_EMPLOYEES,
  RESPONSE_COMPANY_NOT_FOUND,
  RESPONSE_COMPANY_NOT_ACCEPTABLE,
  RESPONSE_COMPANY_FAILURE
} from '../actions/types';

/**
 * initial company
 */
const INIT_STATE = {
  company: {},
  companies: [],
  errorMessage: {},
  loading: false,
  allEmployees: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANY_INFO:
      return { ...state, loading: true, errorMessage: {} };

    case GET_COMPANY_EMPLOYEES:
      return { ...state, loading: true, errorMessage: {} };

    case CREATE_COMPANY_INFO:
      return { ...state, loading: true, errorMessage: {} };

    case UPDATE_COMPANY_INFO:
      return { ...state, loading: true, errorMessage: {} };

    case RESPONSE_COMPANY_SUCCESS:
      action.payload.message ? NotificationManager.success(action.payload.message) : false ;
      return { ...state, loading: false, company: action.payload };

    case RESPONSE_COMPANIES_SUCCESS:
      return { ...state, loading: false, companies: action.payload };

    case RESPONSE_COMPANY_SUCCESS_ALL_EMPLOYEES:
      return { ...state, loading: false, allEmployees: action.payload.employees };

    case RESPONSE_COMPANY_NOT_FOUND:
      NotificationManager.error(action.payload);
      return { ...state, loading: false, errorMessage: {} };

    case RESPONSE_COMPANY_NOT_ACCEPTABLE:
      NotificationManager.error(action.payload.validationMessage);
      return { ...state, loading: false, errorMessage: action.payload.fieldValidationMessages };

    case RESPONSE_COMPANY_FAILURE:
      NotificationManager.error(action.payload);
      return { ...state, loading: false, errorMessage: action.payload };

    default: return { ...state };
  }
}
