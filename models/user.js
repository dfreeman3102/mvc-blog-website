//enabling the usage of the Model and datatypes setting of sequielize
const {Model, DataTypes} = require('sequelize');
//adding bcrypt for password hashing
const bcrypt = require('bcrypt');
//bringing in the sequelize connection from the config file
const sequelize = require('../config/connection.js');

class User extends Model {
    checkPassword(loginPassword) {
        return bcrypt.compare(loginPassword, this.password);
    }
}
//added user table structure
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true,
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len: [8],
            }
        },
        blog_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'blog',
                key:'id'
            }
        }
    },
    {
        hooks:{
            beforeCreate: async (newUser) => {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            }
        },
        sequelize,
        timestamps:false,
        freezeTableName:true,
        underscored:true,
        modelName: 'user'
    }
);

module.exports = User;