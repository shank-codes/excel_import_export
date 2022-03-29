const Label = require('../DAO/LabelDAO');


exports.getLabel = async(id)=> {
    try{
        let label = await Label.getLabel(id);
        return label;
    }catch(err){
        console.log(err);
        return {Success: false, Error: err};
    }
}

exports.createLabel = async(content)=> {
    try{
        let label = await Label.createLabel(content);
        return label;
    }catch(err){
        return {Success: false, Error: err};
    }
}

exports.getAll = async()=> {
    try{
        let label = await Label.getAll();
        if(label.Success)
            return label;
        else
            return {Success: false, Error: "Error in services"};
    }catch(err){
        return {Success: false, Error: err};
    }
  }