const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection.js");

class Blog extends Model {};

Blog.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        title:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        content:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        comments:{
            type:DataTypes.STRING,
            allowNull:true
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                key:'id'
            }
        }

    },
    {
        sequelize,
        timestamps:false,
        freezeTableName:true,
        underscored:true,
        modelName: 'blog'
    }
);

module.exports = Blog;