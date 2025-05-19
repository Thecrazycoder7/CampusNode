const express = require("express");
const app = express();
const AuthRouter = require('./Routes/AuthRouter');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require("./Routes/UserRouter");  

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter);
app.use("/auth", userRouter);

app.listen(PORT, ()  =>{
    console.log(`Server running on port ${PORT}`);
})