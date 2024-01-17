const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  //if we hav the name of the type here, then each time any mutation, query or subscription that return
  // a post, it will go through this post modifiers and apply these modifications
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  // Subscription: {
  //   ...postsResolvers.Subscription,
  // },
};
