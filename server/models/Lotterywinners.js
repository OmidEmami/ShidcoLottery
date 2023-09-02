import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Lotterywinners = db.define('lotterywinners',{ 
    Code :{
        type:DataTypes.TEXT
    },
    
    
    
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
export default Lotterywinners;