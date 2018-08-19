const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const chalk = require('chalk');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const mongoURL = 'mongodb://localhost:27017/gqlex';
mongoose.Promise = global.Promise;
mongoose.connect(mongoURL);
mongoose.connection.on(
  'error',
  console.error.bind(
    console,
    '%s MongoDB connection error. Please make sure MongoDB is running.',
    chalk.red('✗')
  )
);

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
