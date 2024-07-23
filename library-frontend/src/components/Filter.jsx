const Filter = ({ genres, setGenre }) => {
   if (!genres) {
    return null
   }
  return (
    <div style={{display: 'flex', listStyleType: 'none'}}>
      {genres.map(g => (
        <li key={g}>
          <button onClick={() => setGenre(g)}>{g}</button>
        </li>
      ))}
      <button onClick={() => setGenre('')}>all</button>
    </div>
  )

}

export default Filter