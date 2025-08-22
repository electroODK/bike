import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Bike = sequelize.define(
  'Bike',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    size: { type: DataTypes.STRING(50), allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    material_id: { type: DataTypes.INTEGER, allowNull: false },
    information: { type: DataTypes.TEXT },
    photo: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },
    diametr: { type: DataTypes.INTEGER },
    number_of_velocities: { type: DataTypes.INTEGER },
    status: {
      type: DataTypes.ENUM(
        'available',
        'rented',
        'reserved',
        'delivering',
        'inactive'
      ),
      defaultValue: 'available',
    },
  },
  {
    tableName: 'bikes',
    timestamps: true,
  }
);

export default Bike;
