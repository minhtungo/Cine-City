import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Mongodb connected');
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send({ error: 'Error connecting to the database' });
  });
