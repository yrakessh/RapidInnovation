const express = require('express');
const connectDB = require('./config/database')

const app = express();
connectDB();

//Init Middleware
app.use(express.json({ extended: false }))

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/player', require('./routes/api/player'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`))