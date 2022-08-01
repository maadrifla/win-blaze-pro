import { forwardRef, ForwardRefRenderFunction } from 'react';

import { FormControl, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface FormInputProps extends ChakraInputProps {
  name: string;
  placeholder: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, FormInputProps> = (
  { name, placeholder, error = undefined, ...rest }: FormInputProps, 
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <ChakraInput
        name={name} id={name}
        focusBorderColor="primary" _focus={{ }} _hover={{ }}
        bgColor="background" placeholder={placeholder}
        variant="filled" size="lg"
        ref={ref}
        {...rest}
      />

      { !!error && (
        <FormErrorMessage color="primary" fontWeight="bold">{error.message}</FormErrorMessage>
      ) }
    </FormControl>
  );
}

export const FormInput = forwardRef(InputBase);
