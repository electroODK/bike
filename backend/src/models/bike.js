
import { DataTypes } from 'sequelize';
import sequelize from '../middleware/db.js';

const Bike = sequelize.define('Bike', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  size: {
    type: DataTypes.ENUM('XS', 'S', 'M', 'L', 'XL'),
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  information: {
    type: DataTypes.TEXT,
  },
  photo: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: [],
  },
  material_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  diametr: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  number_of_velocities: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  is_amortising: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_rented: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'bikes',
  timestamps: true,
});

export default Bike;
