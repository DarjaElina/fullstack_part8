import { useState } from 'react'
import { useApolloClient } from '@apollo/client';

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from './components/LoginForm';
import Recommended from './components/Recommended';


import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate
} from 'react-router-dom'


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  return (
    <Router>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Link to="/authors">authors</Link>
        <Link to="/">books</Link>
        <Link to="/recommended">recommended</Link>
        <Link to="/add">add book</Link>
        {!token && <Link to="/login">log in</Link>}
        {token && <button onClick={logout}>log out</button>}
      </div>

      <Routes>
        <Route
          path="/login"
          element={<LoginForm setToken={setToken}/>}
        />
        <Route path="/authors" element={<Authors/>}/>
        <Route path="/" element={<Books/>}/>
        <Route path="/add" element={token ? <NewBook/> : <Navigate to="/login"/>}/>
        <Route path="/recommended" element={token ? <Recommended/> : <Navigate to="/login"/>}/>
      </Routes>
    </Router>
  );
};

export default App;
