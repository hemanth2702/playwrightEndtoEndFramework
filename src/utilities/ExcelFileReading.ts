import XLSX from "xlsx";

export function readExcelFileSheetwise(sheetName:string, rowNumber:number):any
{
    let workbook = XLSX.readFile("src/testData/testApp.xlsx");

        //on file need to mention the file name.
    let worksheet = workbook.Sheets[sheetName];

    let jsonObjectData = XLSX.utils.sheet_to_json(worksheet);

    //on file we need to mention the rowNumber that is index value
    return jsonObjectData[rowNumber];
}
