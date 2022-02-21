import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const db = mongoose.connection;
  db.once("open", async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  });
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
