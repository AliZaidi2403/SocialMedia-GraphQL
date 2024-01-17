const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");
const url = `mongodb+srv://amaanzaidi567:mutd2403@cluster0.y6ler67.mongodb.net/?retryWrites=true&w=majority`;

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const pubSub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
    pubSub,
  }), //	An object shared across all resolvers that are executing for a particular operation.
  //Use this to share per-operation state, including authentication information, dataloader instances,
  // and anything else to track across resolvers
});

mongoose
  .connect(url)
  .then(() => {
    console.log("Database Connection Successful");
    return server.listen({ port: 8000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
//apollo server uses express server behind the scenes
