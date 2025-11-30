const express = require('express');
const portfinder = require('portfinder');
const app = express();
require('dotenv').config();
require('./Models/db');
const TaskRouter = require('./Routes/TaskRouter');
const AIRouter = require('./Routes/AIRouter');
const bodyParser = require('body-parser');
const cors = require('cors');

app.get('/', (req, res) => {
    res.send('Hello from the server');
});
app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', TaskRouter);
app.use('/api/ai', AIRouter);

const PORT = process.env.PORT || 8082;

portfinder.basePort = PORT;
portfinder.getPort((err, availablePort) => {
    if (err) {
        console.error('Error finding an available port:', err);
        process.exit(1);
    }

    app.listen(availablePort, () => {
        console.log(`Server is running on PORT=${availablePort}`);
    });
});