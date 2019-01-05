import {
  GET_COMPANY_POSITIONS,
  GET_COMPANY_POSITIONS_BY_PAGE,
  CREATE_POSITIONS,
  STORE_POSITIONS_BEFORE_CREATING,
  RESET_SHOW_ADD_POSITION_BUTTON,
  RESET_STORE_POSITIONS_BEFORE_CREATING,
  RESPONSE_POSITION_SUCCESS,
  RESPONSE_POSITION_GET_SUCCESS,
  RESPONSE_POSITION_NOT_FOUND,
  RESPONSE_POSITION_NOT_ACCEPTABLE,
  RESPONSE_POSITION_FAILURE,
} from './types';

/**
* Redux Action To Get Company Positions
*/
export const getCompanyPositions = (companyId) => ({
  type: GET_COMPANY_POSITIONS,
  payload: { companyId }
})

/**
* Redux Action To Get Company Positions By Page
*/
export const getCompanyPositionsByPage = (companyId, pageNumber) => ({
  type: GET_COMPANY_POSITIONS_BY_PAGE,
  payload: { companyId, pageNumber }
})

/**
* Redux Action To Create Position
*/
export const createPositions = (positions, history, companyId, accountId) => ({
  type: CREATE_POSITIONS,
  payload: { positions, history, companyId, accountId }
})

/**
* Redux Action To Store Positions Before Creating
*/
export const storePositionsBeforeCreating = (positions) => ({
  type: STORE_POSITIONS_BEFORE_CREATING,
  payload: positions
})

/**
* Redux Action To Reset Show Position Button
*/
export const resetShowPositionButton = () => ({
  type: RESET_SHOW_ADD_POSITION_BUTTON,
})

/**
* Redux Action To Reset Store Positions Before Creating
*/
export const resetStorePositionsBeforeCreating = () => ({
  type: RESET_STORE_POSITIONS_BEFORE_CREATING,
})

//  ----------  RESPONSE POSITION ------------  //

/**
* Redux Action position Success
*/
export const responsePositionSuccess = (positions, message) => ({
  type: RESPONSE_POSITION_SUCCESS,
  payload: { positions, message } 
});

/**
* Redux Action Positions Get Success
*/
export const responsePositionGetSuccess = (positions, paginationMeta) => ({
  type: RESPONSE_POSITION_GET_SUCCESS,
  payload: { positions, paginationMeta } 
});

/**
* Redux Action To Position Not Found
*/
export const responsePositionNotFound = (message) => ({
  type: RESPONSE_POSITION_NOT_FOUND,
  payload: message
})

/**
* Redux Action Position Not Acceptable
*/
export const responsePositionNotAcceptable = (validationMessages) => ({
  type: RESPONSE_POSITION_NOT_ACCEPTABLE,
  payload: validationMessages
})

/**
* Redux Action To Get Position Not Acceptable
*/
export const responsePositionFailure = (validationMessages) => ({
  type: RESPONSE_POSITION_FAILURE,
  payload: validationMessages
})