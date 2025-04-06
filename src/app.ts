import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schemas/schema"; // Your schema file
import { resolvers } from "./graphql/resolvers/resolvers"; // Your resolvers file
import { authMiddleware } from "./auth/authMiddleware";

const app = express();

app.use("/api", authMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {},
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(
      `Server running at http://localhost:${port}${server.graphqlPath}`
    );
  });
}

startServer();
