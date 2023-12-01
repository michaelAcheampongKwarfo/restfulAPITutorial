const express = require('express');
const router = express.Router();
const Product = require('../models/product.model')
const createError = require('http-errors');
const mongoose = require('mongoose');


// get all products
router.get('/', async(req, res, next) => {
    try {
        const result = await Product.find({},{
            __v: 0
        });
        res.send(result);
    } catch (error) {
        console.log(error.message)
    }
});

// create a product
router.post('/', async(req, res, next) => {
    try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result)
    } catch (error) {
        console.log(error.message);
        if(error.name === "ValidattionError"){
            next(createError(422, error.message));
            return;
        }
        next(error);
    }
});

// getting a product by id
router.get('/:id', async(req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if(!product){
            throw createError(404, "Product does not exist. ");
        }
        res.send(product);
    } catch (error) {
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(404, "Invalid product id"))
            return;
        }
        next(error);
    }
});


// updating a product by id
router.patch('/:id', async(req, res, next) => {
    try {
    const id = req.params.id;
    const updates = req.body;
    const options = {new: true}
    const result = await Product.findByIdAndUpdate(id, updates, options);
    if(!result){
        throw createError(404, "Product does not exist")
    }
    res.send(result);
    } catch (error) {
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            return next(createError(404, "Invalid product id"))
        }
        next(error);
    }
});

router.delete('/:id', async(req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Product.findByIdAndDelete(id);
        if(!result){
            throw createError(404, "Product does not exist. ");
        }
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(404, "Invalid product id"))
            return;
        }
        next(error);
    }
})

module.exports = router;