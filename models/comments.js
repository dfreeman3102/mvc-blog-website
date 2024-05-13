const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection.js");

class Comment extends Model{};

Comment.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        user_comments:{
            type:DataTypes.STRING,
            allowNull:true
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
        sequelize,
        timestamps:false,
        freezeTableName:true,
        underscored:true,
        modelName: 'comment'
    }
);

module.exports = Comment;