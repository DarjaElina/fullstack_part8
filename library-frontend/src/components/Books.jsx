import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = () => {
  const [genre, setGenre] = useState('')
  const { loading, data, refetch } = useQuery(ALL_BOOKS)

  if (loading) {
    return <div>Loading books...</div>
  }

  const books = data.allBooks

  const arr = []

  books.map(b => {
    b.genres.map(item => arr.push(item))
  })
  const genres = Array.from(new Set(arr))

  const handleClick = (genre) => {
    refetch({genre})
    setGenre(genre)
  }

  return (
    <div>
      <h2>books</h2>

    {genre && <p>in genre <b>{genre}</b></p>}
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
      {genres.map(g => (
        <button
          key={g}
          onClick={() => handleClick(g)}>
            {g}
        </button>
      ))}
      <button onClick={() => handleClick('')}>all</button>
      </div>
    </div>
  )
}

export default Books
