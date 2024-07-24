import { createContext } from 'react';
import { ME } from '../queries'
import { useQuery } from '@apollo/client'

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { loading, data } = useQuery(ME)

  const user = loading ? null : data.me

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;