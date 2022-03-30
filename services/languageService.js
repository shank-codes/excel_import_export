const languageDAO = require("../DAO/languageDAO");

// exports.saveLangauage = async (languageName) => {
//   try {
//     let language = await languageDAO.saveLangauage({
//       Language_name: languageName,
//       Created_date: new Date(),
//       Updated_date: new Date(),
//     });
//     if (language.Success) return { Success: true, language: language.Language };
//     else
//       return {
//         Success: false,
//         Error: "cannot add language --- languageService",
//       };
//   } catch (err) {
//     return { Success: false, Error: err };
//   }
// };

exports.saveLangauage = async (languageName,transaction) => {
  try {
    let language = await languageDAO.saveLangauage({
      Language_name: languageName,
      Created_date: new Date(),
      Updated_date: new Date(),
    },transaction);

    return language
    // if (language.Success) return { Success: true, language: language.Language };
    // else
    //   return {
    //     Success: false,
    //     Error: "cannot add language --- languageService",
    //   };
  } catch (err) {
    return { Success: false, Error: err };
  }
};

exports.getAll = async()=> {
  try{
      let languages = await languageDAO.getAll();
      if(languages.Success)
          return languages;
      else
          return {Success: false, Error: "Error in services"};
  }catch(err){
      return {Success: false, Error: err};
  }
}

exports.update = async(languageId, details)=> {
  try{
      let toUpdate = {
        Language_name: details.Language_name,
        Updated_date: new Date()
      };
      let language = await languageDAO.update(languageId, toUpdate);
      return language;
  }catch(err){
      return {Success: false, Error: err};
  }
}