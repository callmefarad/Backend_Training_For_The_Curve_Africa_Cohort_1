import express from 'express';
import {allSales, singleSale, newSale, updateSale, deleteSale} from '../controllers/saleController.js'

const saleRouter = express.Router();

// endpoint for all sales
saleRouter.get( '/sales', allSales );
// endpoint to get a single sale
saleRouter.get( '/sales/:id', singleSale );
// endpoint to create a sale
saleRouter.post( '/sales', newSale );
// endpoint to update an existing sale
saleRouter.patch( '/sales/:id', updateSale )
// endpoint to remove a sale from the database table
saleRouter.delete( '/sales/:id', deleteSale)

export default saleRouter;