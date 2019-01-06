import {
  GET_COMPANY_POSITIONS,
  GET_COMPANY_POSITIONS_BY_PAGE,
  CREATE_POSITIONS,
  STORE_POSITIONS_BEFORE_CREATING,
  DELETE_POSITION,
  RESET_SHOW_ADD_POSITION_BUTTON,
  RESET_STORE_POSITIONS_BEFORE_CREATING,
  RESPONSE_POSITION_SUCCESS,
  RESPONSE_POSITION_GET_SUCCESS,
  RESPONSE_POSITION_NOT_FOUND,
  RESPONSE_POSITION_NOT_ACCEPTABLE,
  RESPONSE_POSITION_FAILURE,
} from './types';

/**
* Redux action to get company positions.
*/
export const getCompanyPositions = (companyId) => ({
  type: GET_COMPANY_POSITIONS,
  payload: { companyId }
});

/**
* Redux action to get company positions by page.
*/
export const getCompanyPositionsByPage = (companyId, pageNumber) => ({
  type: GET_COMPANY_POSITIONS_BY_PAGE,
  payload: { companyId, pageNumber }
});

/**
* Redux action to create position.
*/
export const createPositions = (positions, history, companyId, accountId) => ({
  type: CREATE_POSITIONS,
  payload: { positions, history, companyId, accountId }
});

/**
* Redux action to store positions before creating.
*/
export const storePositionsBeforeCreating = (positions) => ({
  type: STORE_POSITIONS_BEFORE_CREATING,
  payload: positions
});

/**
* Redux action to delete position.
*/
export const deletePosition = (companyId, positionId, positionName) => ({
  type: DELETE_POSITION,
  payload: { companyId, positionId, positionName }
});

/**
* Redux action to reset show position button.
*/
export const resetShowPositionButton = () => ({
  type: RESET_SHOW_ADD_POSITION_BUTTON,
});

/**
* Redux action to reset store positions before creating.
*/
export const resetStorePositionsBeforeCreating = () => ({
  type: RESET_STORE_POSITIONS_BEFORE_CREATING,
});

//  ----------  RESPONSE POSITION ------------  //

/**
* Redux action position success.
*/
export const responsePositionSuccess = (positions, message) => ({
  type: RESPONSE_POSITION_SUCCESS,
  payload: { positions, message } 
});

/**
* Redux action positions get success.
*/
export const responsePositionGetSuccess = (positions, paginationMeta) => ({
  type: RESPONSE_POSITION_GET_SUCCESS,
  payload: { positions, paginationMeta } 
});

/**
* Redux action to position not found.
*/
export const responsePositionNotFound = (message) => ({
  type: RESPONSE_POSITION_NOT_FOUND,
  payload: message
});

/**
* Redux action position not acceptable.
*/
export const responsePositionNotAcceptable = (validationMessages) => ({
  type: RESPONSE_POSITION_NOT_ACCEPTABLE,
  payload: validationMessages
});

/**
* Redux action to get position not acceptable.
*/
export const responsePositionFailure = (validationMessages) => ({
  type: RESPONSE_POSITION_FAILURE,
  payload: validationMessages
});