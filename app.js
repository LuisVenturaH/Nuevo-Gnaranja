const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.static("public"));
app.use(express.json());

// Conexión con la base de datos

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lv++2023+",
    database: "gnaranja"
});

connection.connect(function(error){
    if(error) {
        return console.log(`error: ${error.message}`)
    }
    console.log("Conectado a MYSQL");
});

/* CREAMOS FUNCION PARA SER LLAMADA A FUTURO */
function handleSQLError(response, error, result, callback){
    if(error){
        response.static(400).send(`error ${error.message}`);
        return;
    }
    callback(result);
}






/*================>>>>>>>>> ENPOINT ZONE <<<<<<<<=====================*/

/* ===========>>> 
endpoint para: LLAMAR LISTADO DE PRODUCTOS 
<<<===========*/
app.get('/productos', function(request, response) {
    connection.query(`select nombre from productos`, function(error, result, fields){
        handleSQLError(response, error, result, function(result){
            let eventos = [];

            for (let i=0; i < result.length; i++ ) {
                eventos[i] = result[i];
                
            }
            response.send(eventos);
        })
    })
})



//===========>>> ENDPOINT AGREGAR REGISTRO USUARIOS <<<===========\\




















// TERMINAR PARA ARRANCAR MYSQL

app.listen(8000, function(){
    console.log("Server is up and running!!!")
})