
import sequelize from "../db/db.js";
import { DataTypes, Model } from "sequelize";

class Project extends Model {}

Project.init(
    {
        id: {
            type: DataTypes.UUID, // ✅ Uses UUID instead of auto-increment ID
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Project name must be unique",
            },
            validate: {
                notEmpty: true,
            },
        },
        users: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            allowNull: false,
            defaultValue: []
        },
    },
    {
        sequelize,
        modelName: "Project",
        timestamps: true, // ✅ Auto-generates createdAt & updatedAt
        underscored: true, // ✅ Makes column names `snake_case` instead of `camelCase`
        freezeTableName: true, // ✅ Prevents Sequelize from pluralizing the table name
    }
)

export { Project }