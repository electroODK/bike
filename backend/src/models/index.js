import sequelize from '../utils/db.js';

import User from './user.js';
import Bike from './bike.js';
import Category from './category.js';
import Material from './material.js';
import Rental from './rental.js';
import RentalBike from './rentalBike.model.js';
import Station from './station.model.js';  

User.hasMany(Rental, { foreignKey: 'user_id', as: 'rentals' });
Rental.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Rental.belongsToMany(Bike, {
  through: RentalBike,
  foreignKey: 'rental_id',
  otherKey: 'bike_id',
  as: 'bikes',
});
Bike.belongsToMany(Rental, {
  through: RentalBike,
  foreignKey: 'bike_id',
  otherKey: 'rental_id',
  as: 'rentals',
});

Station.hasMany(Rental, { foreignKey: 'start_station_id', as: 'rentals_start' });
Station.hasMany(Rental, { foreignKey: 'end_station_id', as: 'rentals_end' });

Rental.belongsTo(Station, { foreignKey: 'start_station_id', as: 'start_station' });
Rental.belongsTo(Station, { foreignKey: 'end_station_id', as: 'end_station' });

Category.hasMany(Bike, { foreignKey: 'category_id', as: 'bikes' });
Bike.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Material.hasMany(Bike, { foreignKey: 'material_id', as: 'bikes' });
Bike.belongsTo(Material, { foreignKey: 'material_id', as: 'material' });

export {
  sequelize,
  User,
  Bike,
  Category,
  Material,
  Rental,
  RentalBike,
  Station, 
};
