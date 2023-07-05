import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import authRouter from './routes/admin/auth.js';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // Apply middleware to every route handler
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(authRouter);

app.listen(3000, () => {
  console.log('Listening');
});
