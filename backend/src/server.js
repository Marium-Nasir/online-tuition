require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 7000;
require('./db/conn');
const cors = require('cors')
const router = require('./router/route');

app.use(express.json());
app.use(cors());
app.use('/api/user',router);
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})