const express = require('express');
const supabase = require('../config/supabase');
const router = express.Router();

router.get('/', async (req, res) => {
  const { category } = req.query;
  
  let query = supabase.from('products').select('*');
  if (category) query = query.eq('category', category);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: "Product not found" });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .insert([req.body])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  delete updates.id;

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select(); 

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (data.length === 0) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({ message: "Product updated successfully", product: data[0] });
});
module.exports = router;