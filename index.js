const express = require('express');
const mongoose = require('mongoose');
const MenuItem = require('./Schema');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 3010;

app.use(express.json()); 

mongoose
  .connect(process.env.MONGODB_URI || 'your_mongodb_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/menu', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required.' });
    }
    const newItem = new MenuItem({ name, description, price });
    await newItem.save();
    res.status(201).json({ message: 'Menu item created', item: newItem });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/menu/:id', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json({ message: 'Menu item updated', item: updatedItem });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/menu/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted', item: deletedItem });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});