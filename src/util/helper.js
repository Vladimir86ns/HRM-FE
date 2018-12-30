import React from 'react';
import IntlMessages from './IntlMessages';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import uniq from 'lodash/uniq';

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

/**
 * Split string with comma, and return array.
 * 
 * @param {string} string string will be split with comma.
 */
export const splitStringWithCommaAndGetArray = (string) => {
  let arr = string.split(",");
  return arr.map(name =>  name.trim());
}

/**
 * Get same values from array.
 * 
 * @param {array} array return duplicated values from array.
 */
export const getSameValuesFromArray = (array) => {
  return uniq(filter(array, (val, i, iteratee) => includes(iteratee, val, i + 1)));
}

/**
 * Return each element from array in quotation marks.
 * 
 * @param {array} array return duplicated values from array.
 */
export const modifyEachElementWithQuotationMarks = (array) => {
  return array.map(e => `"${e}"`);
}

/**
 * Check in array to has object property with given value.
 * 
 * @param {array} array array of objects.
 * @param {string} objectProperty name of object property.
 * @param {string} value value to compare.
 * @param {integer} rowKey key of the row.
 */
export const checkInArrayOfObjectsPropertyWithValueExist = (array, objectProperty, value, rowKey) => {
  let duplicated = '';

  array.filter((el, index) => {
    if(index !== rowKey && value === el[objectProperty]) {
        duplicated = value;
    }
  });

  return duplicated;
}