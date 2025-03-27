const express = require("express");
const app = express();
const AuthRouter = require('./Routes/AuthRouter');
const bodyParser = require('body-parser');
const cors = require('cors');
const ProductRouter = require('./Routes/ProductsRouter');

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.listen(PORT, ()  =>{
    console.log(`Server running on port ${PORT}`);
})