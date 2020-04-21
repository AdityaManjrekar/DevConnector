const express = require('express');

const app = express();

const connectDB = require('./config/db');

connectDB();
app.get('/', (req, resp) => resp.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));