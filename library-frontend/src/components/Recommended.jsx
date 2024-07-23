import { useQuery } from '@apollo/client'
import { RECOMMENDED_BOOKS } from '../queries'


const Recommended = ( { genre }) => {

  
  const result = useQuery(RECOMMENDED_BOOKS, {
    variables: { genre }
  })

  if (!genre) {
   return null
  }

  if (result.error) {
    return (
      <div>
        Error getching recommended books...
      </div>
    )
  }

  if (result.loading) {
    return (
      <div>Loading recommended books...</div>
    )
  }

  const recommended = result.data.allBooks

  return (
    <>
      <h2>recommendations</h2>

      <p>books in your favourite genre <b>{genre}</b></p>

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