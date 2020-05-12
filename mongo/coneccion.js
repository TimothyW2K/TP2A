const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://admin:betp2@cluster0-zdy6w.mongodb.net/test?retryWrites=true&w=majority"
const client = new mongoclient(uri, {useNewUrlParser:true, useUnifiedTopology:true})

const nuevaPersona = {
    first: "Timothy",
    last: "Wider",
    year: 2000,
    gender: "male"
}

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