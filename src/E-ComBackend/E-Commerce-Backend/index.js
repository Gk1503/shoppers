const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const AdminRoutes = require('./routes/adminRoutes');




dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static('uploads'));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/admin',AdminRoutes);



mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true , 
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT,() => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
    
}).catch(err =>{

    console.error('MongoDB connection error :' , err);
});

