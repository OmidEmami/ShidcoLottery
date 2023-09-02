import { Sequelize } from "sequelize";
 
const db = new Sequelize('lotterydatabase', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;

