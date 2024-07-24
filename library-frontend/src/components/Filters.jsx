import { useQuery } from '@apollo/client'
import { ALL_GENRES } from '../queries'

const Filters = ({ setGenre }) => {
  const genreData = useQuery(ALL_GENRES)

  if (genreData.loading) {
    return <div>Loading...</div>
  }

  const genres = genreData.data.allGenres

  const handleClick = (g) => {
    setGenre(g)
  }

  return (
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
  )
}

export default Filters