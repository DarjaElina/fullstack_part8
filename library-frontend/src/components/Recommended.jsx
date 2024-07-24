import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { ALL_BOOKS } from '../queries'

import UserContext from '../context/UserContext'


const Recommended = () => {

  const user = useContext(UserContext)

  const booksData = useQuery(ALL_BOOKS, {
    variables: { genre: user?.favouriteGenre }
  })

  if (booksData.error) {
    return (
      <div>
        Error fetching books...
      </div>
    )
  }

  if (booksData.loading) {
    return (
      <div>Loading recommended books...</div>
    )
  }

  const recommended = booksData.data.allBooks

  return (
    <>
      <h2>recommendations</h2>

      <p>books in your favourite genre <b>{user?.favouriteGenre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommended.map((r) => (
            <tr key={r.title}>
              <td>{r.title}</td>
              <td>{r.author.name}</td>
              <td>{r.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )


}

export default Recommended