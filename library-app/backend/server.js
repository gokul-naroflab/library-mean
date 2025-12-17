const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("Connection Up")})
    .catch(err =>{
        console.error("MongoDB Connection error:",err.message);
        process.exit(1);
    })

const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");

app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);

app.get('/',(req,res)=> res.send('Library App API Running'));

app.listen(PORT,()=>{
    console.log(`Server running @  ${PORT}`);
})