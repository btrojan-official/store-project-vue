import { connectToMongoDB, ObjectId } from "./dbconnect.js";
import bcrypt from "bcryptjs";

let db;
let collection;

const createCollection = async () => {
    let collection = await db.collection('users_collection');
    console.log("+---------------- collection works!")
    return collection
}

const connect = async () => {
    db = await connectToMongoDB()
    console.log("+---------------- db works!");
    collection = await createCollection()
}


const getUsers = async () => {
    const items = await collection.find({}).toArray()
    return items
}

const addUser = async (email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            _id: new ObjectId(),  // unique MongoDB ID
            email: email,
            password: hashedPassword,
            createdAt: new Date()
        };

        const result = await collection.insertOne(newUser);
        console.log("User added:", result.insertedId);
        return result;
    } catch (err) {
        console.log("Error adding user:", err);
    }
};

const doesUserExist = async (email) => {
    const user = await collection.findOne({ email: email });
    return (user !== null);
};


connect()


export { getUsers, addUser, doesUserExist }