function generateData() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
  
    var ruleSheet = sheet.getSheetByName('ルール');
    if (ruleSheet == null) {
     ruleSheet = sheet.insertSheet('ルール');
    } else {
     sheet.deleteSheet(ruleSheet);
     ruleSheet = sheet.insertSheet('ルール');
    }
  
    var workSheet = sheet.getSheetByName('結果');
    if (workSheet == null) {
     workSheet = sheet.insertSheet('結果');
    } else {
     sheet.deleteSheet(workSheet);
     workSheet = sheet.insertSheet('結果');
    }
    
    //initialize rule sheet
    var date = new Date();
    var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    ruleSheet.appendRow(['名前', 'プレフィクス', '推定の労働時間(月)', '開始日', '終了日'])
             .appendRow(['打ち合わせ', '[MTG]', 160, startDate, endDate])
             .appendRow(['移動', '[移動]'])
             .appendRow(['セミナー', '[セミナー]'])
             .appendRow(['面接', '[面接]'])
             .appendRow(['作業', '[作業]'])
             .appendRow(['来訪', '[来訪]'])
             .appendRow(['往訪', '[往訪]'])
             .appendRow(['定例', '[定例]']);
  
   // Set the data validation for cell 
    var range = ruleSheet.getRange('D2:E2');
    var dateRule = SpreadsheetApp.newDataValidation().requireDate().build();
    range.setDataValidation(dateRule);
   
   var lastDateCell = ruleSheet.getRange('E2');
   var firstDate = ruleSheet.getRange('D2').getValue();
   var rule = SpreadsheetApp.newDataValidation().requireDateAfter(firstDate).build();
   lastDateCell.setDataValidation(rule);
    
    //crawl data and drawChart
    listUpcomingEvents();
}

function reloadData() {
  listUpcomingEvents();
}