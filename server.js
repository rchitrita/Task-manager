const express = require('express');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Task Management API is running ");
});

// Your API routes
app.use('/api', taskRoutes);
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000 ");
});