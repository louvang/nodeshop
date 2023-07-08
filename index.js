import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import authRouter from './routes/admin/auth.js';
import adminProductsRouter from './routes/admin/products.js';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

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
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);

app.listen(3000, () => {
  console.log('Listening');
});
