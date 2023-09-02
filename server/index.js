import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";

import path from "path";
import fs from 'fs';
import axios from "axios";
import Lotterywinners from "./models/lotterywinners.js";



const app = express();
app.use(cors());
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
app.use(cookieParser());
app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
server.listen(PORT, ()=> console.log('Server running at port 3001'));

  app.post('/api/registerwinner', async (req, res) => {
    
    try {
        for(let i = 0 ; i < req.body.Code.length ; i++){
      const response = await Lotterywinners.create({
        Code : req.body.Code[i],
       
      })
    }
      res.json("ok")
    } catch (error) {

      
      res.status(500).json({ error: 'An error occurred while making the request.' });
    }
  });
