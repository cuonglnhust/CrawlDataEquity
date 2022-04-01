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
export default class DataSignal extends BaseModel {

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
    order: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
    },
    time: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    type: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    size: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null
    },
    symbol: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    price: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    stop_lost: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    take_profit: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    swap: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    profit: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    version_update: {
        type: DataTypes.INTEGER,
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
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    dataBalance: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    }
};

/**
 * Options model
 */
const options = {
    tableName: 'data_signal'
};

/**
 * Init Model
 */
 DataSignal.init(attributes, { ...options, sequelize });