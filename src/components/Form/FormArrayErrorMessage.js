
import React from 'react';

const FormArrayErrorMessage = ({hasError, required, errorMessage}) => {
  if (hasError) {
    if (errorMessage) {
      return errorMessage;
    }
    let array = hasError[0].split(" ");

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
    return (<p style={{color: 'red'}}>{result.toString().split(',').join(' ').split('_').join(' ')}</p>) 
  }

  if (required) {
    return 'required';
  }
    return '';
}

export default FormArrayErrorMessage;