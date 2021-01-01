import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function connect() {
    if (!client.isConnected()) await client.connect();
    const db = client.db('alversary');

    return {db, client}
}

export { connect };
