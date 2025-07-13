
import sequelize from '../utils/db.js';

import User from './user.js';
import Bike from './bike.js';
import Category from './category.js';
import Material from './material.js';
import Rental from './rental.js';

User.hasMany(Rental, { foreignKey: 'user_id', as: 'rentals' });
Rental.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Bike.hasMany(Rental, { foreignKey: 'bike_id', as: 'rentals' });
Rental.belongsTo(Bike, { foreignKey: 'bike_id', as: 'bike' });

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
};
