const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const app = express();
const port = process.env.PORT || 8000;

connectToMongo();

app.use(cors());
app.use(express.json());
app.use('/api/todos', require('./routes/api'))

app.listen(port, () => {
    console.log(`Server app is listening on port ${port} or on http://localhost:${port}`)
})
