import express from 'express'
import cors from 'cors'

// const express = require('express');
// const cors = require('cors');

const app = express();

app.use(cors());

app.get('/api', (req, res) => {
    const data = {
        message: 'Hello, this is your JSON response!',
        success: true,
        timestamp: new Date().toISOString()
    };
    res.json(data);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
