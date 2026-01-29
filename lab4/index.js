const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routers/users');
const postRouter = require('./routers/posts');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routers
app.use('/users', userRouter);
app.use('/posts', postRouter);


app.use(errorHandler);

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
    mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.log('Failed to connect to MongoDB');
            console.log(err);
        });
    console.log(`Server is running on Port:${PORT}`);
});