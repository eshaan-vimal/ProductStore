import mongoose from 'mongoose';

import Product from '../models/product.model.js';


const createProduct = async (req, res) =>
{
    const product = req.body;

    if (!product.name || !product.price || !product.image)
    {
        res.status(400).json({success: false, message: "Insufficient product details"});
        console.log(`Invalid Request: Insufficient product details`);
    }

    const newProduct = new Product(product); 

    try
    {
        await newProduct.save();
        res.status(201).json({sucess: true, message: "New product added", data: newProduct});
        console.log("New product added");
    }
    catch (error)
    {
        res.status(500).json({success: false, message: `Server Error: ${error.message}`});
        console.log(`Server Error: ${error.message}`);
    }
};

const deleteProduct = async (req, res) =>
{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(404).json({success: false, message: "Invalid ID: Product not found"});
        console.log("Invalid ID: Product not found.");
    }

    try
    {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted", data: deletedProduct});
        console.log("Product deleted");
    }
    catch (error)
    {
        res.status(500).json({success: false, message: `Server Error: ${error.message}`});
        console.log(`Server Error: ${error.message}`);
    }
};

const findProducts = async (req, res) =>
{
    try
    {
        const products = await Product.find({});
        res.status(200).json({success: true, message: "All products fetched", data: products});
        console.log("All products");
    }
    catch (error)
    {
        res.status(500).json({success: false, message: `Server Error: ${error.message}`});
        console.log(`Server Error: ${error.message}`);
    }
};

const findProduct = async (req, res) =>
{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
    {
        req.status(404).json({success: false, message: "Invalid ID: Product not found"});
        console.log("Invalid ID: Product not found");
    }

    try
    {
        const getProduct = await Product.findById(id);

        

        res.status(200).json({success: true, message: "Product found", data: getProduct});
        console.log("Product found");
    }
    catch (error)
    {
        res.status(500).json({success: false, message: `Server Error: ${error.message}`});
        console.log(`Server Error: ${error.message}`);
    }
};

const updateProduct = async (req, res) => 
{
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(404).json({success: false, message: "Invalid ID: Product not found"});
        console.log("Invalid ID: Product not found");
    }

    try
    {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, message: "Product updated", data: updatedProduct});
        console.log("Product updated");
    }
    catch (error)
    {
        res.status(500).json({success: false, message: `Server Error: ${error.message}`});
        console.log(`Server Error: ${error.message}`);
    }
};


export {createProduct, deleteProduct, findProducts, findProduct, updateProduct};