import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import routes from './src/routes/index.js';

const app = express();

const corsOptions = {
  origin: 'https://cine-city.vercel.app',
  credentials: true,
  preflightContinue: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
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
