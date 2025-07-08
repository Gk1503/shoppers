const CartDetails = require('../models/cartModel');

exports.createCart = async (req,res) => {
    try{
        const {cartProductImgae ,cartProductQuantity,cartProductPrice, cartProductTotalAmount ,cartProductTitle} = req.body;
        console.log(req.body);

        const totalAmount = parseInt(cartProductQuantity) * parseInt(cartProductPrice);
        const cart = await CartDetails.create({
            cartProductImgae,
            cartProductTitle,
            cartProductQuantity,
            cartProductPrice,
            cartProductTotalAmount:totalAmount            
        });
        console.log("Cart Itme saved :",cart);
        res.status(201).json(cart);
    } catch(err){
        console.log("Error saving cart", err);
        res.status(500).json({error : "Failed to save cart item", message:err.message});
    }
  
};


exports.getCart = async(req,res) => {
    try{
        const carts = await CartDetails.find();
        res.json(carts);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};


exports.getCarts = async(req,res) => {
    try{
        const cart = await CartDetails.findById(req.params.id);
        if(!cart) return res.status(404).json({error: 'Cart item Not Found'});
        res.json(cart);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.updateCart = async(req,res) =>{
    try{
        const cart = await CartDetails.findByIdAndUpdate(req.params.id,req.body,{
            new :true,
            runValidators : true
        });
        if(!cart) return res.status(404).json({error : 'Cart Not Found'});
        res.json(cart);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

exports.deleteCart = async(req,res) =>{
    try{
        const cart = await CartDetails.findByIdAndDelete(req.params.id);
        if(cart) return res.status(404)({error : 'Cart Not Found'});
        res.json({message:'Cart item Deleted Successfully'});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.updateCartQuantity = async (req,res) => {
    try{
        const {id} = req.params;
        const {quantity} = req.body;

        const updatedCart = await CartDetails.findByIdAndUpdate(
            id,
            { cartProductQuantity : quantity} ,
            { new: true}
        );

        if(!updatedCart) {
            return res.status(404).json({ error : 'Cart item not found'});
        }

        res.status(200).json(updatedCart);
    } catch ( err) {
        res.status(500).json({ error : err.message});
    }
}

