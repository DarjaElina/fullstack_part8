import { useState, useEffect } from 'react'
import { NetworkStatus, useApolloClient, useQuery } from '@apollo/client';

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from './components/LoginForm';
import Recommended from './components/Recommended';

import { ME } from './queries';

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'


const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  let user;

  const {loading, data, refetch, networkStatus} = useQuery(ME, {
    notifyOnNetworkStatusChange: true
  })

 useEffect(() => {
  refetch()
 }, [token])

 if (networkStatus === NetworkStatus.refetch) {
  return console.log('refetching user data')
 }
 if (loading) {
  return null
 }
 user = data.me

 console.log('user:', user)
  


  const logout = () => {
    user = null
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  

  return (
    <Router>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Link to="/authors">authors</Link>
        <Link to="/">books</Link>
        {user && <Link to="/recommended">recommended</Link>}
        {!user && <Link to="/login">log in</Link>}
        {user && <Link to="/add">add book</Link>}
        {user && <button onClick={logout}>log out</button>}
      </div>

      <Routes>
        <Route
          path="/login"
          element={<LoginForm setToken={setToken}/>}
        />
        <Route path="/authors" element={<Authors/>}/>
        <Route path="/" element={<Books/>}/>
        <Route path="/add" element={<NewBook/>}/>
        <Route path="/recommended" element={user ? <Recommended genre={user.favouriteGenre}/> : null}/>
      </Routes>
    </Router>
  );
};

export default App;
