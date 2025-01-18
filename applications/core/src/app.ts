import express from 'express';
import userRouter from './router/user/user.router';
import * as settings from './utils/settings';

const app = express();

app.use(express.json());


app.use('/', (req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/not-found', (req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception:', err);
  process.exit(1); // Exit process after handling
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});



export default app;
