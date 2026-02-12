require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routers/products');
const cartRoutes = require('./routers/cart');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));