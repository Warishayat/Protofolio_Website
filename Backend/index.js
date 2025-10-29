const express = require('express');
const cors = require('cors');
const ConnectDB = require("./Config/db");
const Admin_router = require('./Router/AdminAuth');
const Project_router = require('./Router/ProjectRoute');
const Message_router = require("./Router/MessageRoute");
const CV_router = require("./Router/CvRoute");
const app = express()

const dotenv = require('dotenv').config()
app.use(cors({
  origin: '*',        
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())
const PORT = process.env.PORT || 8000;

ConnectDB();


app.get("/",(req,res)=>{
    res.send('elwss')
})

app.use("/auth",Admin_router)
app.use("/project",Project_router)
app.use("/message", Message_router);
app.use("/resume",CV_router)

app.listen(PORT,()=>{
    console.log(`App is running on port: ${PORT}`)
})