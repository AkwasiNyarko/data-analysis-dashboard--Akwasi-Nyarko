
import React, { useState, useEffect } from 'react';

// BrokenNullProperty: Accessing property of null
export const BrokenNullProperty = () => {
  // This will throw a TypeError
  const data = null;
  return <div>{data.property}</div>;
};

// BrokenArrayOutOfBounds: Accessing out-of-bounds array index
export const BrokenArrayOutOfBounds = () => {
  // This will throw an error
  const arr = [1, 2, 3];
  return <div>{arr[5].toString()}</div>;
};

// BrokenThrowError: Throws an error intentionally
export const BrokenThrowError = () => {
  // This will throw an error intentionally
  throw new Error('This is a thrown error!');
};

// BrokenRenderLoop: Causes infinite render loop
export const BrokenRenderLoop = () => {
  // This will cause a render loop
  const [count, setCount] = useState(0);
  setCount(count + 1);
  return <div>Count: {count}</div>;
};

// BrokenFailedFetch: Simulates a failed network request
export const BrokenFailedFetch = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Simulate a failed fetch
    setTimeout(() => {
      setError('Failed to fetch data!');
    }, 1000);
  }, []);
  if (error) throw new Error(error);
  return <div>{data}</div>;
};

// Export all for easy import
export default {
  BrokenNullProperty,
  BrokenArrayOutOfBounds,
  BrokenThrowError,
  BrokenRenderLoop,
  BrokenFailedFetch,
};
