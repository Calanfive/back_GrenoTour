import { DataTypes, Sequelize } from "sequelize";

export const TokenBlackListModel = (sequelize: Sequelize) => {
    return sequelize.define('token-black-list', {
        token: DataTypes.STRING,
    });
}