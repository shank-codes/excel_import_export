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

exports.getLanguages = async () => {
    console.log('----------------------------------->reached here')
    let language = await models.language.findAll();
    console.log(language)
    language = JSON.stringify(language);
    language = JSON.parse(language);
    console.log(language)
    return {language}
}