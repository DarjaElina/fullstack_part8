import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from 'react'

import Filters from './Filters'

const Books = () => {
  const [currentGenre, setCurrentGenre] = useState('')
  const bookData = useQuery(ALL_BOOKS)
  if (bookData.loading) {
    return <div>Loading...</div>
  }

  const books = bookData.data.allBooks

  const setGenre = (genre) => {
    bookData.refetch({ genre })
    setCurrentGenre(genre)
  }

  return (
    <div>
      <h2>books</h2>

    {currentGenre && <p>in genre <b>{currentGenre}</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    <div>
      <Filters setGenre={setGenre}/>
      </div>
    </div>
  )
}

export default Books
