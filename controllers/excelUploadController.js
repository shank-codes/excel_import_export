const express = require("express");
const router = express.Router();

const fs = require("fs");
const xlsx = require("xlsx");
const formidable = require("formidable");

const excelUploadService = require('../services/excelUploadService');

const languageDAO = require('../DAO/languageDAO');

const excel = require('exceljs')

router
  .route("/uploadFile")
  .get(async (req, res) => {
    //C:\Users\HP\Desktop\Avysh\excel_import_export\controllers\Book1.xlsx
    // const workbook = xlsx.readFile("C:/Users/HP/Desktop/Avysh/excel_import_export/controllers/Book1.xlsx");
    // let worksheets = {};
    // for (const sheetName of workbook.SheetNames) {
    //   console.log(`---->${sheetName}`);
    //   worksheets[sheetName] = xlsx.utils.sheet_to_json(
    //     workbook.Sheets[sheetName]
    //   );
    // }
    // res.send(worksheets);
  })
  .post(async (req, res) => {
    const form = formidable({
      multiples: false,
      uploadDir: `${__dirname}/../uploads`,
      keepExtensions: true,
    });

    form.parse(req,async (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      console.log(req.file);
      console.log(files.excelFile.filepath);

      const workbook = xlsx.readFile(files.excelFile.filepath);

      let worksheets = {};
      for (const sheetName of workbook.SheetNames) {
        console.log(`---->${sheetName}`);
        worksheets[sheetName] = xlsx.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
      }

      await excelUploadService.addExcelToDatabase(worksheets)
      fs.unlink(files.excelFile.filepath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.send('done');

      //res.json({ fields, files });
    });
  });

  router.get('/download', async (req,res) => {
    try {

      const workbook = xlsx.readFile("C:/Users/HP/Desktop/Avysh/excel_import_export/template.xlsx");
    let worksheets = {};
    for (const sheetName of workbook.SheetNames) {
      console.log(`---->${sheetName}`);
      worksheets[sheetName] = xlsx.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );
    }

    let languages = await languageDAO.getLanguages();

      worksheets.Language.push(
        languages.language[0]

      )

      await xlsx.utils.sheet_add_json(workbook.Sheets['Language'],worksheets.Language)
      await xlsx.writeFile(workbook, "C:/Users/HP/Desktop/Avysh/excel_import_export/template.xlsx")

      const wb = new excel.Workbook();

      await wb.xlsx.readFile("C:/Users/HP/Desktop/Avysh/excel_import_export/template.xlsx")

      res.setHeader('Content-Type',"application/vnd.openxmlformats-officedocument.spreadsheet.sheet");
      res.setHeader('Content-Disposition', 'attachment; filename='+'Template.xlsx')

      return wb.xlsx.write(res);
      

      //res.send( worksheets);

    }
    catch(err) {
      res.send(err)
    }
  })

module.exports = router;


// {
// 	"language": [
// 		{
// 			"Language_id": 1,
// 			"Language_name": "US-en",
// 			"Created_date": "2022-03-28T11:31:20.000Z",
// 			"Updated_date": "2022-03-28T11:31:20.000Z"
// 		},
// 		{
// 			"Language_id": 2,
// 			"Language_name": "IN-kn",
// 			"Created_date": "2022-03-28T11:31:21.000Z",
// 			"Updated_date": "2022-03-28T11:31:21.000Z"
// 		},
// 		{
// 			"Language_id": 3,
// 			"Language_name": "IN-hi",
// 			"Created_date": "2022-03-28T11:31:21.000Z",
// 			"Updated_date": "2022-03-28T11:31:21.000Z"
// 		}
// 	]
// }