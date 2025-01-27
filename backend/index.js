const express = require("express");
const mainRouter=require("./routes/index");
require('dotenv').config()

const cors = require('cors');
const app=express();
app.use(cors());  
app.use(express.json());
app.use('/api/v1',mainRouter);
app.listen(process.env.PORT,()=>{
  console.log(`PORT ${process.env.PORT}`)
});