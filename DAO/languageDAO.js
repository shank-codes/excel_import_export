//const Language = require('../models/Language');

const sequelize = require('./database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);

exports.saveLangauage = async(languageDetails)=> {
    try{
        let language = await models.language.create(languageDetails);
        return {Success: true, Language: language};
    }
    catch(err){
        return {Success: false, Error: err};
    }
}

exports.getAll = async()=> {
    try{
        let language = await models.language.findAll();
        language = JSON.stringify(language);
        language = JSON.parse(language);
        return {Success: true, Language: language};
    }
    catch(err){
        return {Success: false, Error: err};
    }
}