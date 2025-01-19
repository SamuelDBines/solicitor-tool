import express from 'express';
import cors from 'cors';
import userRouter from './router/user/user.router';
import personGroupRouter from './router/personGroup/personGroup.router';
import taskRouter from './router/task/task.router';
import eventRouter from './router/event/events.router';
import googleAuthRouter from './router/google/google.router';
import googleEventRouter from './router/google/google-event.router';
import outlookAuthRouter from './router/outlook/msal-auth.router';
import outlookEventRouter from './router/outlook/msal.router';




import * as settings from './utils/settings';


const app = express();

app.use(cors());

app.options('*', cors());

app.use(express.json());


app.use('/', (req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

app.use('/api/users', userRouter);
app.use('/api/groups', personGroupRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/events', eventRouter);
app.use('/auth', googleAuthRouter);
app.use('/events', googleEventRouter);
app.use('/auth', outlookAuthRouter);
app.use('/events', outlookEventRouter);


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

setInterval(() => {
  const used = process.memoryUsage();
  console.log(`Memory Usage:`);
  console.log(`- RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB`);
  console.log(`- Heap Total: ${(used.heapTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`- Heap Used: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`- External: ${(used.external / 1024 / 1024).toFixed(2)} MB`);
}, 60000);

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception:', err);
  process.exit(1); // Exit process after handling
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});




export default app;
