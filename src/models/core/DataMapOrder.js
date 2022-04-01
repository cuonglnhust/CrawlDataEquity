import { DataTypes } from 'sequelize';
import { sequelize } from '../../connections';
import BaseModel from './BaseModel';

/**
 * Define Customer Model
 * 
 * @export
 * @class Customer
 * @extends {BaseModel}
 */
export default class DataMapOrder extends BaseModel {

    static association() {
    }
}

/**
 * Attributes model
 */
const attributes = {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    order_origin_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
    },
    order_copy_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
    },
    client_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: ''
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    }
};

/**
 * Options model
 */
const options = {
    tableName: 'data_map_order'
};

/**
 * Init Model
 */
 DataMapOrder.init(attributes, { ...options, sequelize });