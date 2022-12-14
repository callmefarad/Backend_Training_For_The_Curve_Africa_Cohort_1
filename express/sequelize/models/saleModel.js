import Sequelize from 'sequelize';
import db from "../config/dbConfig.js";

const { DataTypes } = Sequelize;

const saleModel = db.define( 'salesTable', {
    productName: {
        type: DataTypes.STRING
    },
    productPrice: {
        type: DataTypes.DOUBLE
    }
}, {
    freezeTableName: true
})

export default saleModel;

