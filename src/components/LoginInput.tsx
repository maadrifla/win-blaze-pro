import React, { forwardRef, ForwardRefRenderFunction } from 'react';

import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label: string;
  error?: FieldError;
  isPassword?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = undefined, isPassword = false, ...rest }: InputProps, 
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={name} color="white" fontWeight="regular"
      >{label}</FormLabel> }

      <ChakraInput
        name={name} id={name}
        focusBorderColor="primary" _focus={{ }} _hover={{ }}
        bgColor="background"
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

export const LoginInput = forwardRef(InputBase);
