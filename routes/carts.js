import express from 'express';
import cartsRepo from '../repositories/carts.js';
import productsRepo from '../repositories/products.js';
import cartShowTemplate from '../views/carts/show.js';

const router = express.Router();

// post - add
router.post('/cart/products', async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find((item) => {
    return item.id === req.body.productId;
  });

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items,
  });

  res.redirect('/cart');
});

// get - add
router.get('/cart', async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect('/');
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

// post - delete
router.post('/cart/products/delete', async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);

  const items = cart.items.filter((item) => {
    return item.id !== itemId;
  });

  await cartsRepo.update(req.session.cartId, { items });

  res.redirect('/cart');
});

export default router;
