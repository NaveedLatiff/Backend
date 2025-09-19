const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const mongoUrl = "mongodb+srv://root:root@naveed.abihchq.mongodb.net/?retryWrites=true&w=majority&appName=Naveed";

let _db;

const mongoConnect=async()=>{
    try {
        const client = await mongoClient.connect(mongoUrl);
        _db = client.db('airbnb');
        console.log("MongoDB Connected ✅");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

const getdb=()=>{
    if(!_db){
        throw new Error("Mongo Not Connected");
    }
    return _db;
}

exports.mongoConnect=mongoConnect;
exports.getdb=getdb;