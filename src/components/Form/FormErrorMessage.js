
const FormErrorMessage = ({message, required}) => {
  if (message) {
    return  message;
  }
    
  if (required) {
    return 'required';
  }
      
  return '';
}

export default FormErrorMessage;