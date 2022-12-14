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
        // grab the id passed to the url
        const id = req.params.id;
        // get the sale based on the id passed by the client
        const sale = await saleModel.findAll( {
            where : { id: id}
        } );
        // check if there is an actual object properties/attributes from the response
        if ( sale.length === 0 ) {
            res.status( 404 ).json( {
                message: `No such id: ${ id }`
            } );
        } else {
            // return the result
            res.status( 200 ).json( {
                data: sale[0]
            });
        }
    } catch ( e ) {
        // return an error message
        res.status( 404 ).json( {
            message: e.message
        })
    }
}


// create a new sale
export const newSale = async (req, res) => {
    try {
        // create a new sale using sequelize method
        const sale = await saleModel.create( req.body );
        // return the result of the new sale created
        res.status( 201 ).json( {
            message: "Sales created successfully",
            data: sale
        })
    } catch ( e ) {
        // throw an error message
        res.status( 400 ).json( {
            message: e.message
        })
    }
}

// update an existing sale
export const updateSale = async (req, res) => {
    try {
        // grab the id from the url
        const id = req.params.id;
        const updatedSale = await saleModel.update( req.body, { where: { id: id } } );
        if ( updatedSale[0] == 0 ) {
            res.status( 404 ).json( {
                message: `No such id: ${ id }`
            } );
            console.log(updatedSale[0])
        } else {
            // return the result
            res.status( 200 ).json( {
                message: "Update successfully",
                data: updatedSale
            });
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// remove sale from the database table
export const deleteSale = async (req, res) => {
    try {
        // grab the id from the url
        const id = req.params.id;
        // remove the sale with the specified id passed
        const removedSale = await saleModel.destroy( {
            where: { id: id}
        } );
        // check for wrong id
        if ( removedSale == 0 ) {
            res.status( 404 ).json( {
                message: `No such id: ${ id }`
            } );
            console.log(removedSale)
        } else {
            // return the result
             res.status( 200 ).json( {
            message: "Successfully deleted",
            data: removedSale
        })
        }
    } catch ( e ) {
        res.status( 400 ).json( {
            message: e.message
        })
    }
} 
// remove sale from the database table
// export const deleteSale = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const removedSale = await saleModel.destroy( {
//             where: { id: id}
//         } );
//         res.status( 200 ).json( {
//             message: "Successfully deleted",
//             data: removedSale
//         })
//     } catch ( e ) {
//         res.status( 400 ).json( {
//             message: e.message
//         })
//     }
// } 
