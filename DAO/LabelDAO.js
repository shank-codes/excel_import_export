const sequelize = require('./database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);

// exports.createLabel = async(content)=> {
//     try{
//         let date = new Date();
//         let label = await models.label.create({
//            Label_name: content.label_name,
//            Label_value: content.label_value,
//            Language_id: content.language_id,
//            Created_date: date,
//            Updated_date: date
//         });
//         return {Success: true, Content: label};
//     }catch(err){
//         return {Success: false, Error: err};
//     }
// }

//updated code with transaction
exports.createLabel = async(content,transaction)=> {
    try{
        let date = new Date();
        let label = await models.label.create({
           Label_name: content.label_name,
           Label_value: content.label_value,
           Language_id: content.language_id,
           Created_date: date,
           Updated_date: date
        },{transaction: transaction});
        return {Success: true, Content: label};
    }catch(err){
        return {Success: false, Error: err};
    }
}

exports.getLabel = async(id)=> {
    try{
        let label = await models.label.findAll({
            where: {
                Label_id: id,
            }
        });
        // console.log(label[languageCode]);
        return {Success: true, Label: label}
    }catch(err){
        console.log(err);
        return {Success: false, Error: err};
    }
}


exports.getAll = async()=> {
    try{
        let label = await models.label.findAll();
        label = JSON.stringify(label);
        label = JSON.parse(label);
        return {Success: true, Label: label};
    }
    catch(err){
        return {Success: false, Error: err};
    }
  }