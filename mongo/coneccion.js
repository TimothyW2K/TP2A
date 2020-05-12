const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://admin:betp2@cluster0-zdy6w.mongodb.net/test?retryWrites=true&w=majority"
const client = new mongoclient(uri, {useNewUrlParser:true, useUnifiedTopology:true})


//User (Le agrego 1 dato extra, ya que las bases de datos NoSQL, permiten esto)
const nuevaPersona = {
    first: "Timothy",
    last: "Wider",
    year: 2000,
    gender: "male"
}

//CRUD Create Read Update Delete


//Conecta a la base de datos
function connectToBD(){
    return new Promise((resolve, reject)=>{
        client.connect((err, result) => {
            if (!err) {
                resolve(result.db("desafio2").collection("desafio2"));
                console.log(chalk.green("Se ha logrado establecer una conexion."))
    
            } else {
                console.log(chalk.red("No se ha logrado establecer una conexion: ", err))
            }
        })
    })
}

//Inserta en la base da datos (CREATE)
async function insertData(persona){
    const collection = await connectToBD()
    return new Promise((resolve, reject)=>{
        resolve(collection.insertOne(persona, (error, result) => {
            if(!error){
                  console.log(chalk.green("La persona ingresada ha sido insertada correctamente."))
            }
        }))
    })
}

//Modifica en la base de datos (UPDATE), harcodeado 
async function modifyData(lastName){
    let collection = await connectToBD()
    return new Promise((resolve, reject)=>{
        resolve(collection.updateOne({last: lastName}, {$set: {year: 2001}} , (err, result) => {
            if(!err){
            console.log(chalk.green("La persona ingresada ha sido modificada correctamente"))
            }
        }))
    })
}
//Elimina a una persona en la base de datos (DELETE), hardcodeado
async function deleteData(lastName){
    let collection = await connectToBD()
    return new Promise((resolve, reject)=>{
        resolve( collection.deleteOne({last: lastName}, (err, result) => {
            if(!err){
                console.log(chalk.green("La persona ingresada ha sido eliminada correctamente"))
            }
        }))
    })
}
//Muestra los ultimos #cant datos de la base de datos (READ)
async function showData(cant){
    let collection = await connect()
    return new Promise((resolve, reject)=>{
        collection.find().limit(cant).toArray((err, result) => {
            if(!err){
                console.log(result);
            }
        })
    })
}


insert(nuevaPersona)
modifyData("Wider")
deleteData("Wider")
showData(20)