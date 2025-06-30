const Snack = require('../models/Snack');

const getAllSnacks = async (req, res) => {
  try {
    const snacks = await Snack.find({ available: true }).sort({ createdAt: -1 });
    res.json({
      message: 'Snacks retrieved successfully',
      count: snacks.length,
      snacks
    });
  } catch (error) {
    console.error('Get snacks error:', error);
    res.status(500).json({ message: 'Error retrieving snacks' });
  }
};

const createSnack = async (req, res) => {
  try {
    const { name, imageUrl, price, category, description } = req.body;

    if (!name || !imageUrl || !price || !category) {
      return res.status(400).json({ 
        message: 'Name, image URL, price, and category are required' 
      });
    }

    const snack = new Snack({
      name,
      imageUrl,
      price,
      category,
      description
    });

    await snack.save();

    res.status(201).json({
      message: 'Snack created successfully',
      snack
    });
  } catch (error) {
    console.error('Create snack error:', error);
    res.status(500).json({ message: 'Error creating snack' });
  }
};

const updateSnack = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageUrl, price, category, description, available } = req.body;

    const snack = await Snack.findByIdAndUpdate(
      id,
      { name, imageUrl, price, category, description, available },
      { new: true, runValidators: true }
    );

    if (!snack) {
      return res.status(404).json({ message: 'Snack not found' });
    }

    res.json({
      message: 'Snack updated successfully',
      snack
    });
  } catch (error) {
    console.error('Update snack error:', error);
    res.status(500).json({ message: 'Error updating snack' });
  }
};

const deleteSnack = async (req, res) => {
  try {
    const { id } = req.params;

    const snack = await Snack.findByIdAndDelete(id);

    if (!snack) {
      return res.status(404).json({ message: 'Snack not found' });
    }

    res.json({
      message: 'Snack deleted successfully',
      snack
    });
  } catch (error) {
    console.error('Delete snack error:', error);
    res.status(500).json({ message: 'Error deleting snack' });
  }
};

module.exports = {
  getAllSnacks,
  createSnack,
  updateSnack,
  deleteSnack
};