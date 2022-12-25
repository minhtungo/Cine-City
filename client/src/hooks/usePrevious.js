import { useRef, useEffect } from 'react';

// access the previous value of a variable
const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // returns the previous value of the variable
  return ref.current;
};

export default usePrevious;
