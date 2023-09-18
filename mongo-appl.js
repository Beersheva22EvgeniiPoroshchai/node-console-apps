import MongoConnection from "./domain/MongoConnection.mjs";
const mongoconnection = new MongoConnection(process.env.ATLAS_URI, "college");
const studentsMDB = mongoconnection.getCollection("students");
studentsMDB.find({phone:{$regex:/^050/}}).toArray().then(data => console.log(data));
//if not much data - toArray, otherwise: stream -> pipe and then send 