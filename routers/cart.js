const express = require('express');
const supabase = require('../config/supabase');
const router = express.Router();

router.post('/add', async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const { data: product, error: fetchError } = await supabase
    .from('products')
    .select('stock, name')
    .eq('id', productId)
    .single();

  if (fetchError || !product) return res.status(404).json({ error: "Product not found" });
  if (product.stock < quantity) return res.status(400).json({ error: "Insufficient stock" });

  const { data, error: cartError } = await supabase
    .from('cart')
    .insert([{ product_id: productId, quantity }])
    .select();

  if (cartError) return res.status(500).json({ error: cartError.message });

  res.json({ message: `Success! Added ${product.name} to cart.`, item: data[0] });
});

module.exports = router;