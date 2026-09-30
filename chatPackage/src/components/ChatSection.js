import React, { useRef } from 'react';

const MyComponent = () => {
  const myRef = useRef(null);

  return <div ref={myRef}>Hello World!</div>;
};

export default MyComponent;
