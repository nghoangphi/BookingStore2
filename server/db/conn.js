const mysql = require("mysql2");

const conn = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Hoangphi192@",
    database:"crudmysql"
}
);

conn.connect((err)=>{
    if(err) throw err;
    console.log("DB connected");
});
module.exports = conn;