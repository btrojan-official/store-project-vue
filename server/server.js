// import express from 'express'
// import cors from 'cors'

// import imported_data from './data.js'

const express = require('express');
const cors = require('cors');

const imported_data = require("./data.json")

const app = express();

app.use(cors());

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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
