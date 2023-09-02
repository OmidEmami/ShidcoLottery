import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import Lotterywinners from "./models/lotterywinners.js";



const app = express();
const corsOptions = {
  origin: 'http://localhost:3000'
  , // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you're using cookies or sessions
};

app.use(cors(corsOptions));
const server = http.createServer(app);
const PORT = process.env.PORT || 3002;
app.use(cookieParser());
app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
server.listen(PORT,'0.0.0.0', ()=> console.log('Server running at port 3002'));

  app.post('/api/registerwinner', async (req, res) => {
    
    try {
        for(let i = 0 ; i < req.body.Code.length ; i++){
      const response = await Lotterywinners.create({
        Code : req.body.Code[i],
       
      })
    }
      res.json("ok")
    } catch (error) {
console.log(error)
      
      res.status(500).json({ error: 'An error occurred while making the request.' });
    }
  });
