const express = require("express");
const router = express.Router();

const fs = require("fs");
const xlsx = require("xlsx");
const formidable = require("formidable");

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
    const form = formidable({ multiples: false, uploadDir: `${__dirname}/../uploads`,keepExtensions:true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      console.log(files.excelFile.filepath)

      const workbook = xlsx.readFile(files.excelFile.filepath);

      let worksheets = {};
      for (const sheetName of workbook.SheetNames) {
        console.log(`---->${sheetName}`);
        worksheets[sheetName] = xlsx.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
      }
  
      res.send(worksheets);

      //res.json({ fields, files });
    });
  });

module.exports = router;
