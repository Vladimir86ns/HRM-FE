import React from 'react';
import IntlMessages from './IntlMessages';
 /**
   * Return error message, or required. 
   * 
   * @param {string} message message to display.
   * @param {boolean} required is field required or not.
   * @return {string} message.
  */
export const formErrorMessage = (message, required = false) => {
  if (message) {
    return message;
  }
    
  if (required) {
    return <IntlMessages id="form.formErrorMessage.required"/>;
  }
      
  return '';
};

 /**
   * Remove dot, and snake case from field name from backend response.
   * 
   * @param {string} message message to display.
   * @param {boolean} required is field required or not.
   * @return {string} message.
  */
export const formArrayErrorMessage = (message, required= false) => {
  if (message) {
    let array = message[0].split(" ");

    let result = array.map((word) => {
      if (word.includes('.')) {
        let array = word.split(".");
        
        if (array.length == 2) {
          return array[0] + '.';
        }
        return array[array.length -1];
      }

      return word;
    })
    
    return result.toString().split(',').join(' ').split('_').join(' ');
  }

  if (required) {
    return <IntlMessages id="form.formArrayErrorMessage.required"/>;
  }
  
  return '';
};

/**
 * Check has company id.
 */
export const hasCompanyId = () => {
  return localStorage.getItem('company_id') ? true : false;
}
