import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import patientRouter from '../routes/patient.routes.js';
import userRouter from '../routes/user.routes.js';
import appointmentRouter from '../routes/appointment.routes.js';
// const dotenv = require('dotenv')
import dotenv from 'dotenv';
dotenv.config()

var whitelist = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://172.16.0.104:3000', 'http://172.16.0.103:3000',
                'http://172.16.0.100:3000', 'http://172.16.0.103:3000', 'http://172.16.0.103:3001', 'http://172.16.0.101:3001',
                'http://172.16.0.101:3000', 'http://localhost:3001',
/** other domains if any */ ]
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS', origin))
      console.log('origin: ', origin);
    }
  }
// origin: '*'
}

// console.log(' process.env.DB_PORT: ',  process.env.DB_PORT);
// console.log(' process.env.DB_USER: ',  process.env.DB_USER);
// console.log(' process.env.DB_PASSWORD: ',  process.env.DB_PASSWORD);
// console.log(' process.env.DB_NAME: ',  process.env.DB_NAME);

const originF = (req, res)=>{
    var origin = req.get('origin');
    console.log(origin);
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/', patientRouter);
app.use('/', userRouter);
app.use('/', appointmentRouter);
app.all('*', (req, res)=>res.send('page not found'));

app.listen(3001, ()=>console.log('listening to port 3001'));