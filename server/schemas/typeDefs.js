const { gql } = require('apollo-server-express');

const typeDefs =gql`
type Book {
    authors: [String!]
    description : String!
    bookID : String!
    image: String
    link: String
    title: String!
 }

 type User {
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
 }
`

module.exports = typeDefs;