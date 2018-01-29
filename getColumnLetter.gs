function columnToLetter(column)
{
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function test() {
  sheet = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log(sheet.getSheetByName('asdsa'));
}