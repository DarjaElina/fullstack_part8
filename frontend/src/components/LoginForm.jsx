import { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { LOGIN, ME } from '../queries'

import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const client = useApolloClient()

  const [ login, result ] = useMutation(LOGIN, {
    refetchQueries: [{ ME }]
  })


  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      client.resetStore()
      localStorage.setItem('library-user-token', token)
      navigate('/')
    }
  }, [ result.data ])

  
  

  

  const submit = async (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm