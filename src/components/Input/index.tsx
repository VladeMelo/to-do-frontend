import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
  } from 'react';
  
  import { useField } from '@unform/core';
  
  import { Container } from './styles';
  
  interface InputProps {
    name: string;
    type: 'title' | 'description';
    placeholder: string;
    currValue?: string
  }
  
  const Input: React.FC<InputProps> = ({
    name,
    type,
    placeholder,
    currValue
  }) => {
    const [isFocused, setIsFocused] = useState(false);
  
    const inputRef = useRef(null)
    const { fieldName, defaultValue, registerField } = useField(name);
  
    useEffect(() => {
      console.log(currValue)
    }, [currValue])

    useEffect(() => {
      registerField({
        name: fieldName, 
        ref: inputRef.current, 
        path: 'value', 
      });
    }, [fieldName, registerField]);
  
    const handleInputBlur = useCallback(() => {
      setIsFocused(false);
    }, []); 
  
    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);
  
    return (
      <Container
        isFocused={isFocused}
        type={type}
      >
        {type === 'title' 
          ? <input
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              defaultValue={currValue || defaultValue}
              ref={inputRef}
              placeholder={placeholder}
            /> 
          : <textarea 
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              defaultValue={currValue || defaultValue} 
              placeholder={placeholder}  
              ref={inputRef}
            />
        }
      </Container>
    );
  };
  
  export default Input;