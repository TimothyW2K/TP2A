const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://admin:betp2@cluster0-zdy6w.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongoclient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

function connectToDB() {
  return client.connect()
    .then(result => {
      console.log(chalk.green("Se ha logrado establecer una conexion."))
      return result.db("desafio2").collection("desafio2");
    })
    .catch(error => {
      console.log(chalk.red("No se ha logrado establecer una conexion: ", error));
      return null;
    });
}

function insertData(persona) {
  return connectToDB()
    .then(async collection => {
      const result = await collection.insertOne(persona);
      if (result) {
        console.log(chalk.green("La persona ingresada ha sido insertada correctamente."));
        return result;
      }
      else {
        throw new Error();
      }
    })
    .catch(() => {
      console.log(chalk.red("Ha ocurrido un error al intentar insertar el usuario"));
    });
}

function showData(cant) {
  return connectToDB()
    .then(async collection => {
      const result = await collection.find().limit(cant).toArray();
      if (result) {
        console.log(result);
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      console.log(chalk.red("Ha ocurrido un error al intentar traer la informacion de los usuarios:"));
    });
}

/*
async function showDataAsyncAwait(cant) {
  const collection = await connectToDB();
  if (collection) {
    const result = await collection.find().limit(cant).toArray();
    if (result) {
      console.log(result);
    } else {
      console.log(chalk.red("Ha ocurrido un error al intentar traer la informacion de los usuarios:", err));
    }
  }

  client.close();
}
*/

function modifyData(lastName) {
  return connectToDB()
    .then(async collection => {
      const result = await collection.updateOne({ last: lastName }, { $set: { year: 2001 } })
      if (result) {
        console.log(chalk.green("La persona ingresada ha sido modificada"));
      }
      else {
        throw new Error();
      }
    })
    .catch(() => {
      console.log(chalk.red("Ha ocurrido un error al intentar modificar al usuario"));
    });
}

function deleteData(lastName) {
  return connectToDB()
    .then(async collection => {
      const result = await collection.deleteOne({ last: lastName });
      if (result) {
        console.log(chalk.green("La persona ingresada ha sido eliminada"));
      }
      else {
        throw new Error();
      }
    })
    .catch(() => {
      console.log(chalk.red("Ha ocurrido un error al intentar eliminar al usuario"));
    });
}


const nuevaPersona = {
  first: "Timothy",
  last: "Wider",
  year: 2000,
  gender: "male"
}
//1ra manera
async function start(nuevaPersona){
  await insertData(nuevaPersona);
  await modifyData("Wider");
  await showData(20);
  await deleteData("Wider");
  client.close();
}

start(nuevaPersona);

//2da manera manera
/*
insertData(nuevaPersona).then(
  () => modifyData("Wider").then(
    () => showData(20).then(
      () => deleteData("Wider")
    )
  )
)
.finally(function () {
  console.log(chalk.red("Coneccion cerrada"));
  client.close();
})
*/
