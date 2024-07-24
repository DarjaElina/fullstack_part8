import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    id
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query recommendedBooks($genre: String) {
  allBooks(
  genre: $genre
  ) {
    title
    published
    author {
      name
    }
    id
    genres
  }
}
`

export const ALL_GENRES = gql`
query {
  allGenres
}
`


export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
  title: $title,
  author: $author,
  published: $published,
  genres: $genres
  ) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const EDIT_YEAR = gql`
mutation editYear($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born) {
    name
    born
    bookCount
    id
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const ME = gql`
query {
  me {
    username
    favouriteGenre
  }
}
`