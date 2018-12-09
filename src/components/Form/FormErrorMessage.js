
import React from 'react';

const FormErrorMessage = ({message}) => {
    if (message) {
        return  (<p style={{color: 'red'}}>{message}</p>) 
    }
    
    return (<p></p>)
}

export default FormErrorMessage;