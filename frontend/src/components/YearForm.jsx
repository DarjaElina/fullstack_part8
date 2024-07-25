import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_YEAR } from '../queries'
import Select from 'react-select'

const YearForm = ({ authors }) => {

  const [name, setName] = useState({})
  const [born, setBorn] = useState('')

  const [ changeYear ] = useMutation(EDIT_YEAR)

  if (!authors) {
    return null
  }

  const submit = (e) => {
    e.preventDefault()

    changeYear({ variables: { name: name.value, born }})

    setName('')
    setBorn('')
  }

  

  const options = authors.map(a => {
    return { value: a.name, label: a.name}
  })



  return (
    <form onSubmit={submit}>
      <div>
        <Select
        onChange={setName}
        options={options}/>
      </div>
      <div>
        year <input
          value={born}
          onChange={({ target }) => setBorn(+target.value)}
        />
      </div>
      <button type="submit">update author</button>
    </form>
  )
}

export default YearForm