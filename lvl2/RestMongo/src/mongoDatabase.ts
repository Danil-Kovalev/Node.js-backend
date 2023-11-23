import { MongoClient } from 'mongodb';

const dbUrl = "mongodb+srv://Danylo:passwordcourses12345@datauser.tqkhlcr.mongodb.net/";
const client = new MongoClient(dbUrl);
client.connect().then(res => console.log("Connected to database!"));
const db = client.db("myDatabase");
export const collectionDb = db.collection("dataUsers");