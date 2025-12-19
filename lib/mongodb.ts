import { MongoClient, ServerApiVersion } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

// Connecr to MongoDB
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

const mongoDB = new MongoClient(uri, options);

// Check the connection
async function connectToDatabase() {
  try {
    await mongoDB.connect();
    console.log("Connected to MongoDB successfully");
  }
  catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

attachDatabasePool(mongoDB);

export default mongoDB;