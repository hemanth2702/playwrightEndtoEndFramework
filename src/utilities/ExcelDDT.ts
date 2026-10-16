import XLXS from "xlsx";

export function readExcelFileDDT(sheetName:string):any
{

    let workbook = XLXS.readFile("src/testData/testApp.xlsx");
    let worksheet = workbook.Sheets[sheetName];
    let jsonObjectDaata = XLXS.utils.sheet_to_json(worksheet);
    

    return jsonObjectDaata;
}