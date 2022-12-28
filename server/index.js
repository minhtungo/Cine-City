import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import routes from './src/routes/index.js';

const app = express();

const corsOptions = {
  origin: ['http://127.0.0.1:5173', 'https://cine-city.vercel.app'],
  credentials: true,
  preflightContinue: true,
  optionSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', routes);

const port = process.env.PORT || 5000;

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Mongodb connected');
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send({ error: 'Error connecting to the database' });
  });

export default app;
