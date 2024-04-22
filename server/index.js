require("dotenv").config();
const express = require("express");

const app = express();
const mysql = require("mysql2");
const cors = require("cors");
require("./db/conn");
const router = require("./Routes/router");
const port = 8000


// app.get("/",(req,res)=>{
//     res.send("server start")

// });
app.use(express.json())
app.use(cors());

app.use(router);

app.listen(8000, function() {
    console.log("Server is running on port " + 8000);
});
