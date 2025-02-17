import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

import connectDB from './config/db.js';
import productRoutes from './routes/product.route.js';


dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();


app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use('/api/products', productRoutes);


app.listen(PORT, async () =>
{
    await connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});
