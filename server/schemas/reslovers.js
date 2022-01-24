const { User } = require("../models");

const resolvers = {
    Query: {
      me: (root, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id });
        }
    }
}