const express = require("express");
const mainRouter=require("./routes/index");
const cors = require('cors');
const app=express();
app.use(cors({
    origin: ["*"],
    methods: ["POST", "GET"],
    credentials: true
  }));  
app.use(express.json());
app.use('/api/v1',mainRouter);
app.listen(3000);