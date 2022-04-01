
// export {default as DataSignal} from './DataSignal';
// export {default as DataMapOrder} from './DataMapOrder';
// export {default as DataOpen} from './DataOpen';
export {default as DataEquity} from './DataEquity';
//export {default as DataTraded} from './DataTraded';





import { sequelize } from '../../connections';

for (let m in sequelize.models) {
    sequelize.models[m].sync();
}

// Init association
for (let m in sequelize.models) {
    sequelize.models[m].association();
}