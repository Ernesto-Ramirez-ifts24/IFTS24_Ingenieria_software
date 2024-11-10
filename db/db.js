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
    console.log("Conexión a base de datos exitosa");
});

module.exports = connection;
