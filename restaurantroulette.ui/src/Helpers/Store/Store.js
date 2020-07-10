/* eslint-disable import/prefer-default-export */
import React from 'react';
import firebase from 'firebase';

export const initialState = {
  params: '',
  city: '',
  price: '',
  authed: false,
};

export const Context = React.createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case 'storeParams':
      return { params: action.payload };
    case 'storeCity':
      return { city: action.payload };
    case 'storePrice':
      return { price: action.payload };
    case 'storeAuthed':
      return { authed: action.payload };
    default:
      return state;
  }
};

// export const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [authed, setAuthed] = useState(null);
//   const [pending, setPending] = useState(true);

//   useEffect(() => {
//     firebase.auth().onAuthStateChanged((user) => {
//       setAuthed(true);
//       setPending(false);
//     });
//   }, []);

//   if (pending) {
//     return <>Loading...</>;
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         authed,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
