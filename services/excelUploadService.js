const languageService = require("./languageService");
const pageService = require("./PageService");
const labelService = require("./LabelService");
const pageLabelService = require("./PageLabelService");



exports.addExcelToDatabase = async (worksheets) => {
  try {
    console.log("inside excelUploadService");
    if (
      worksheets.Language === undefined ||
      worksheets.Page === undefined ||
      worksheets.Label === undefined ||
      worksheets.Page_map === undefined
    ) {
      throw new Error("all tables must be there in the excel file");
    }

    for (const languageObj of worksheets.Language) {
      await languageService.saveLangauage(languageObj.Language_name);
    }

    for (const pageObj of worksheets.Page) {
      await pageService.createPage({name: pageObj.Page_name});
    }

    for (const labelObj of worksheets.Label) {
      await labelService.createLabel({
        label_name: labelObj.Label_name,
        label_value: labelObj.Label_value,
        language_id: labelObj.Language_id,
      })
    }
    for (const pageLabelObj of worksheets.Page_map) {
      await pageLabelService.createPageLabel({
          page:pageLabelObj.Page_id,
          label:pageLabelObj.Label_id
      })
    }
  } catch (err) {
    console.log(err);
  }
};
