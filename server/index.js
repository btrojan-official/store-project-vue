import express, { json } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { getUsers, getUser, addUser, doesUserExist, loginUser } from "./app/dbcontroller.js"
import imported_data from "./data.json" with {type: "json"} 
import cookieParser from "cookie-parser";
// import { createTask, getTasks, getById, deleteById, updateTask } from "./app/dbcontroller.js"

const app = express()
const PORT = 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,            //ustawia header access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(json())
app.use(cors(corsOptions));
app.use(cookieParser())

app.get("/api/users", async (req, res) => {
    const users = await getUsers();
    res.status(200).json(users);
})

app.get('/promotions', (req, res) => {
    const data = imported_data;
    res.json(data.promotions);
});

app.get('/promotion/:id', (req, res)=>{
    res.json(imported_data.promotions.find(item => item.id == req.params.id));
})

app.get("/product/:id", (req, res) => {
    res.json(imported_data.products.find(item => item.id == req.params.id));
})

app.post("/createUser", async (req, res) => {

    const { email, password } = req.body;
    const userExists = await doesUserExist(email);
    if (userExists){ res.json({ status: "exist" }); }
    else{
        addUser(email, password);
        res.json({ status: "success" })
    }
})

app.post("/loginUser", async (req, res) => {
    const { email, password } = req.body;
    const user = await getUser(email);

    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = await loginUser(email);
            res.json({ status: "authorized", email: email, token: token })
        }else{
            res.json({ status: "unauthorized"})
        }
    }else{
        res.json({ status: "unauthorized" })
    }
})

app.post("/logoutUser", (req, res) => {
    const { token } = getUser(req.body.email);
    if(token == req.body.token){
        logoutUser(req.body);
        res.json({ status: "logout" })
    }else{
        res.json({ status: "invalid_token" })
    }
})

app.get("/getCurrentUser", async (req, res) => {
    // pobranie emaila z ciastka
    if(req.cookies === undefined) return res.json({ status: "unauthorized 1" });
    else if(req.cookies.email === undefined) return res.json({ status: "unauthorized 2" });
    else if(req.cookies.token === undefined) return res.json({ status: "unauthorized 3" });

    const email = req.cookies.email;
    const token = req.cookies.token;

    const user = await getUser(email);
    if(user === null) return res.json({ status: "unauthorized 4" });
    else if(user.token !== token && user.token !== null) return res.json({ status: "unauthorized 5" });
    else if(user.token_ttl < Date.now()) return res.json({ status: "unauthorized 6" });
    else res.json({ status: "authorized", email: email, token: token })
 })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

    