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

  const { data: existingCartItem, error: existingError } = await supabase
    .from('cart')
    .select('id, quantity')
    .eq('product_id', productId)
    .maybeSingle(); 

  const currentCartQuantity = existingCartItem ? existingCartItem.quantity : 0;
  const newTotalQuantity = currentCartQuantity + quantity;

  if (product.stock < newTotalQuantity) {
    return res.status(400).json({ 
      error: `Insufficient stock. You have ${currentCartQuantity} in cart and only ${product.stock} available.` 
    });
  }

  let resultData;
  let resultError;

  if (existingCartItem) {
    const { data, error } = await supabase
      .from('cart')
      .update({ quantity: newTotalQuantity })
      .eq('id', existingCartItem.id)
      .select();
    resultData = data;
    resultError = error;
  } else {
    const { data, error } = await supabase
      .from('cart')
      .insert([{ product_id: productId, quantity }])
      .select();
    resultData = data;
    resultError = error;
  }

  if (resultError) return res.status(500).json({ error: resultError.message });

  res.json({ 
    message: existingCartItem ? "Quantity updated" : "Product added to cart", 
    item: resultData[0] 
  });
});

module.exports = router;