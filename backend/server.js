import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/keys/google', (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || '' });
});

app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

//// use this when you want to copy the build here 
//app.use(express.static(path.join('public')))

// app.use((req, res, next) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html' ));
//   });

//// if you chosse to keep it seprate
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 4000; //changed from 5000 to 4000 to resolve conflict with other server
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`connected to ${process.env.MONGODB_URI}`);
  })
  .catch((err) => {
    console.log(err.message);
  });
