import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import books from "../../Frontend/src/assets/list.json" with { type: "json" };

dotenv.config({ path: "../.env" });

async function run() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("test");
        const collection = database.collection("books");

        // Insert JSON data directly
        const result = await collection.insertMany(books);
        console.log(`${result.insertedCount} documents inserted`);
    } finally {
        await client.close();
    }
}

run().catch(console.error);