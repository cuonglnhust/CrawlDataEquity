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
export default class DataEquity extends BaseModel {

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
    balance: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
    },
    equity: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    free_margin: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    drawdown: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null
    },
    datetime: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
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
    },
};

/**
 * Options model
 */
const options = {
    tableName: 'data_equity'
};

/**
 * Init Model
 */
 DataEquity.init(attributes, { ...options, sequelize });