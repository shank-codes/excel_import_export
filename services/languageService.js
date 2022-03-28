const languageDAO = require("../DAO/languageDAO");

exports.saveLangauage = async (languageName) => {
  try {
    let language = await languageDAO.saveLangauage({
      Language_name: languageName,
      Created_date: new Date(),
      Updated_date: new Date(),
    });
    if (language.Success) return { Success: true, language: language.Language };
    else
      return {
        Success: false,
        Error: "cannot add language --- languageService",
      };
  } catch (err) {
    return { Success: false, Error: err };
  }
};