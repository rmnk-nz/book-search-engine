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
   _id: ID!
   username: String!
   email: String!
   savedBooks: [Book]
   bookCount: Int
 }

 type Auth {
   token: ID!
   user: User
 }

 type Query {
   me: User
 }

 input bookInput {
   bookId: String!
   authors: [String!]
   desription: String
   title: String
   image: String
   link: String
 }

 type Mutation {
   login(email: String!, password: String!): Auth
   addUser(username: String!, email:String!, password: String!): Auth
   saveBook(input: bookInput): User
   removeBook(bookId: String!): User
 }
`;

module.exports = typeDefs;