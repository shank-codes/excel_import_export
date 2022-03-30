const Page = require('../DAO/PageDAO');


exports.getPage = async(pageName)=> {
    try{
        let page = await Page.getPage(pageName);
        return page;
    }catch(err){
        return {Success: false, Error: err};
    }
}

// exports.createPage = async(details)=> {
//     try{
//         let page = await Page.createPage(details);
//         return page;
//     }catch(err){
//         console.log(err);
//         return {Success: false, Error: err};
//     }
// }

exports.createPage = async(details,transaction)=> {
    try{
        let page = await Page.createPage(details,transaction);
        return page;
    }catch(err){
        console.log(err);
        return {Success: false, Error: err};
    }
}
exports.getAll = async()=> {
    try{
        let page = await Page.getAll();
        if(page.Success)
            return page;
        else
            return {Success: false, Error: "Error in services"};
    }catch(err){
        return {Success: false, Error: err};
    }
  }