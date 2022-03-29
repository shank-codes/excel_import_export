const excel = require('exceljs');

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




exports.returnTemplate = async()=> {
    try{
        let workbook = new excel.Workbook();
        await workbook.xlsx.readFile('./Template.xlsx');
        let languageSheet = workbook.getWorksheet("Language");
        languageSheet.columns = [
            {header: "Language_id", key: "Language_id", width: 20},
            {header: "Language_name", key: "Language_name", width: 18},
            {header: "Created_date", key: "Created_date", width: 28},
            {header: "Updated_date", key: "Updated_date", width: 28}
        ];

        let languages = await languageService.getAll();
        let arr = languages.Language;
        let result = arr.map(object=> {
            return [
                object.Language_name,
                object.Language_id,
                object.Created_date,
                object.Updated_date
            ]
        });

        const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

        for(let i=2, k=0; k<result.length; i++, k++){
            for(let j=0; j<result[0].length; j++){
                let attribute = alphabets[j] + i;
                languageSheet.getCell(attribute).value = result[k][j];
            }
        }

        return workbook.xlsx.writeFile('./Template.xlsx');
    }
    catch(err){
        console.log("Error in services: ", err);
        return {Success: false, Error: err};
    }
}