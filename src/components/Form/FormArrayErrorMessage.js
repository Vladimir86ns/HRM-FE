
import React from 'react';

const FormArrayErrorMessage = ({message, required}) => {
  if (message) {
    let array = message[0].split(" ");

    let result = array.map((world) => {
      if (world.includes('.')) {
        let array = world.split(".");
        
        if (array.length == 2) {
          return array[0] + '.';
        }
        return array[array.length -1];
      }

      return world;
    })
    return (<p style={{color: 'red'}}>{result.toString().split(',').join(' ').split('_').join(' ')}</p>) 
  }

  if (required) {
    return 'required';
  }
    return '';
}

export default FormArrayErrorMessage;