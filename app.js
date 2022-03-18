const express = require('express')
//const sequelize = require('sequelize')
const sequelize = require("./DAO/database");


/*
---> to create tables
const initModels = require("./models/init-models")
const models = initModels(sequelize)
*/

// ---> calling the DAO/database.js
// sequelize
//   .sync({force: true})
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const app = express();

app.get('/', (req,res) => {
    res.send('welcome to main route')
})

app.listen(3000,()=> {
    console.log('server listening in port 3000')
})