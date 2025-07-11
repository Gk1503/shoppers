const Product = require('../models/productsModel') ;

exports.createProduct = async (req,res) => {
try {
    const { productCategory, productTitle, productDescription, productOrginalAmount, productAmount, productOffer } = req.body;

    const imageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;

    const product = await Product.create({
      productImage: imageUrl,
      productCategory,
      productTitle,
      productDescription,
      productOrginalAmount,
      productAmount,
      productOffer,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProducts = async(req,res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.getproducts = async(req,res) =>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({error : 'User not found'});
        res.json(product);
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      productCategory,
      productTitle,
      productDescription,
      productOrginalAmount,
      productAmount,
      productOffer
    } = req.body;

    // Build the update object dynamically
    const updateData = {
      productCategory,
      productTitle,
      productDescription,
      productOrginalAmount,
      productAmount,
      productOffer
    };

    // If a new file is uploaded, update the image URL
    if (req.file) {
      updateData.productImage = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteProduct = async(req,res) =>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(product) return res.status(404)({error : 'Product Not Found'});
        res.json({message:'Product Deleted Successfully'});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};


