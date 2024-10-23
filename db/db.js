const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "eventos"
});

connection.connect((error) => {
    if (error){
        return console.error(error);
    }
    console.log("Conexión exitosa a base de datos");
});

module.exports = connection;
