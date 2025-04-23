import express, { json } from "express";
import cors from "cors";
import { getUsers, addUser, doesUserExist } from "./app/dbcontroller.js"
import imported_data from "./data.json" with {type: "json"} 
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

app.get("/api/users", async (req, res) => {
    const users = await getUsers();
    res.status(200).json(users);
})

// app.get("/api/task/:id", async (req, res) => {
//     console.log("get task by id");
//     const tasks = await getById(req.params.id);
//     res.status(200).json(tasks);
// })

// app.delete("/api/task/:id", async (req, res) => {
//     console.log("delete task by id");
//     const tasks = await deleteById(req.params.id);
//     res.status(200).json(tasks);
// })

// app.patch("/api/task", async (req, res) => {
//     console.log("update task");
//     const tasks = await updateTask(req.body.data);
//     res.status(200).json(tasks);
// })

app.get('/promotions', (req, res) => {
    const data = imported_data;
    res.json(data);
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
    if (userExists){ console.log("user exists"); res.json({ status: "exist" }); }
    else{
        addUser(email, password);
        res.json({ status: "success" })
    }
})

app.post("/loginUser", (req, res) => {
    // sprawdzenie czy dane usera są w bazie danych mongodb
    // jeśli tak to ustawiamy cookie
    // ustandaryzowane odpowiedzi, np
    res.json({ status: "notlogged" })
})

app.post("/logoutUser", (req, res) => {
    // usunięcie cookie
    // ustandaryzowana odpowiedz, np
    res.json({ status: "logout" })
})

app.get("/getCurrentUser", (req, res) => {
    // pobranie emaila z ciastka
    const email = req.cookies.email;
    //sprawdzenie czy jest w bazie danych mongodb
    // ustandaryzowane odpowiedzi, np
    if (found)
       res.json({ status: "authorized", email: email })
 })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

    