require("dotenv").config();
import cors from "cors";
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";

const port = 9000;

const mount = async (app: Application) => {
  try {
    const db = await connectDatabase();
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ db }),
    });

    server.applyMiddleware({ app, path: "/api" });
    app.listen(process.env.PORT);
    app.use(cors());

    console.log(`[app] : http://localhost:${port}`);
    const listings = await db.listings.find({}).toArray(); // listings is type any[]
    console.log(listings[0]);
  } catch (error) {
    console.log("error:", error);
  }
};

mount(express());
