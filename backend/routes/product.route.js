import express from "express";

import {createProduct, deleteProduct, findProducts, findProduct, updateProduct} from '../controllers/product.controller.js';


const router = express.Router();


router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.get("/", findProducts);
router.get("/:id", findProduct);
router.put("/:id", updateProduct);


export default router;