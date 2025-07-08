const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getCategory = async (req,res) => {
    try{
        const categories = await Category.find();
        res.json(categories);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};


exports.getcategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id); // Fixed: 'parms' → 'params'
    if (!category) return res.status(404).json({ error: 'Category Not Found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateCategory = async(req,res) =>{
    try{
        const category = await Category.findByIdAndUpdate(req.params.id,req.body, {
            new:true,
            runValidators : true
        });
         if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category Not Found' });
    res.json({ message: 'Category Deleted Successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
