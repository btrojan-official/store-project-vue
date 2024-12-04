import express from 'express'
import cors from 'cors'

import imported_data from './data.js'

// const express = require('express');
// const cors = require('cors');

const app = express();

app.use(cors());

app.get('/promotions', (req, res) => {
    const data = imported_data;
    res.json(data);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
