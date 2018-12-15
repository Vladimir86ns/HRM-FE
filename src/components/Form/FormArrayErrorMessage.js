import React from 'react';

// helper function
import {
  formArrayErrorMessage
} from '../../../src/util/index';

const FormArrayErrorMessage = ({message, required = false}) => {
  if (message) {
    return (<p style={{color: 'red'}}>{formArrayErrorMessage(message, required)}</p>) 
  }
  return (<p>{formArrayErrorMessage(message, required)}</p>) 
}

export default FormArrayErrorMessage;