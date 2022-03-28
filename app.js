require("dotenv").config();

const { config } = require('dotenv');
const express = require('express')
//const sequelize = require('sequelize')
const sequelize = require("./DAO/database");

const excelUploadController = require('./controllers/excelUploadController')


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

app.use('/excel', excelUploadController)

sequelize
.sync({alter:true})
.then( req => {
    app.listen(process.env.PORT,()=> {
        console.log(`server listening in http://${process.env.HOSTNAME}:${process.env.PORT}`)
    })
});

// app.listen(process.env.PORT,()=> {
//     console.log('server listening in port 3000')
// })