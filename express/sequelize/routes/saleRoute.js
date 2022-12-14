import express from 'express';
import {allSales, singleSale, newSale} from '../controllers/saleController.js'

const saleRouter = express.Router();

// endpoint for all sales
saleRouter.get( '/sales', allSales );
// endpoint to get a single sale
saleRouter.get( '/sales/:id', singleSale );
// endpoint to create a sale
saleRouter.post( '/sales', newSale );

export default saleRouter;