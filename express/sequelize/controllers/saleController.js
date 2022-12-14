// import the sales model
import saleModel from '../models/saleModel.js';

// controller for all sales
export const allSales = async (req, res) => {
    try {
        const sales = await saleModel.findAll();
        if ( sales.length === 0 ) {
            res.status( 404 ).json( {
            message: "There is no record in the table"
        })
            console.log("There is no record in the table")
        }else{
            res.status( 200 ).json( {
            message: "Total sale is: "+ sales.length,
            data: sales
        })
        }
    } catch ( error ) {
        console.log(error)
    }
}

// logic to get a single sale
export const singleSale = async (req, res) => {
    try {
        // grab the id from the url
        const id = req.params.id;
        const sale = await saleModel.findAll( {
            where : { id: id}
        } );
        if ( sale.length === 0 ) {
            res.status( 404 ).json( {
                message: `No such id: ${ id }`
            } );
            console.log(salesTable[0].id)
        } else {
            res.status( 200 ).json( {
                data: sale[0]
            });
        }
    } catch ( e ) {
        res.status( 404 ).json( {
            message: e.message
        })
    }
}


// create a new sale
export const newSale = async (req, res) => {
    try {
        const sale = await saleModel.create( req.body );
        res.status( 201 ).json( {
            data: sale
        })
    } catch ( e ) {
        res.status( 400 ).json( {
            message: e.message
        })
    }
}


