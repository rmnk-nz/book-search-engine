const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
      me: async(root, args, context) => {
        if (context.user) {
            const userData = await User.findOne({ _id: context.user._id }).select(
              "-__v -password"
            );
            return userData;;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
    },
    
    Mutation: {
      login: async (root, { email, password }) => {
        const user = await User.findOne({ email });
      
        if (!user) {
          throw new AuthenticationError('No profile found!');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Login failed');
        }
        const token = signToken(user);
        return { token, user };
      },
      addUser: async (root, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
      
        return { token, user };
      },
      saveBook: async (root, { bookData }, context) => {

        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: bookData } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      removeBook: async (root, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    }
}

module.exports = resolvers;