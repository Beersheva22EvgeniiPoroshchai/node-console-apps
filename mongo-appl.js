import MongoConnection from "./domain/MongoConnection.mjs";
const mongoConnection = new MongoConnection(process.env.ATLAS_URI, 'college');
const studentsMDB = mongoConnection.getCollection("students");
studentsMDB.find({phone:{$regex:/^052/}}).toArray().then(data => console.log(data));   //toArray - promise; if stream: emit,on