const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection.js");

class Comment extends Model{};

Comment.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
        },
        user_comments:{
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
        modelName: 'comment'
    }
);

module.exports = Comment;