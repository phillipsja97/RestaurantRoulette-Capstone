import React from 'react';

export const initialState = { params: '', city: '', price: '' };

export const Context = React.createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case 'storeParams':
      return { params: action.payload };
    case 'storeCity':
      return { city: action.payload };
    case 'storePrice':
      return { price: action.payload };
    default:
      return state;
  }
};
