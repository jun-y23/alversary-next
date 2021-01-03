import { MongoClient } from "mongodb";

const uri: string = process.env.DB_URI as string

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function connect() {
    if (!client.isConnected()) await client.connect();
    const db = client.db('alversary');

    return {db, client}
}

export { connect };
