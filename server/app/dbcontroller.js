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

const getUser = async (email) => {
    const user = await collection.findOne({ email: email });
    return user;
};

const addUser = async (email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            _id: new ObjectId(),  // unique MongoDB ID
            email: email,
            password: hashedPassword,
            createdAt: new Date(),
            token: null,
            token_ttl: null
        };

        const result = await collection.insertOne(newUser);
        return result;
    } catch (err) {
        console.log("Error adding user:", err);
    }
};

const loginUser = async (email) => {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const token_ttl = Date.now() + 1000 * 60 * 60 * 24;
    await collection.updateOne({ email: email }, { $set: { token: token, token_ttl: token_ttl } });

    return token
}

const logoutUser = async (email) => {
    await collection.updateOne({ email: email }, { $set: { token: null, token_ttl: null } });
}

const doesUserExist = async (email) => {
    const user = await collection.findOne({ email: email });
    return (user !== null);
};


connect()


export { getUsers, getUser, addUser, doesUserExist, loginUser }