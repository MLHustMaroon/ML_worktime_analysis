function listUpcomingEvents() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("結果");
    var chart = sheet.getCharts()[0];
  if(typeof chart != "undefined"){
    sheet.removeChart(chart);
  }
  var ruleSheet = ss.getSheetByName("ルール");
  var type_num = ruleSheet.getLastRow();
  var subjects = ruleSheet.getRange('A2:A'+type_num+'').getValues();
  var types = ruleSheet.getRange('B2:B'+type_num+'').getValues();
  var subject_arr = [];
  var type_arr = [];
  var row_num = sheet.getLastRow();
  var calendarId = Session.getActiveUser().getEmail();    
  var other_time = ruleSheet.getRange('C2').getValue();
  if(other_time == ''){
    Browser.msgBox('推定の労働時間(月)に入力してください！');
    return false;
  }
  subject_arr.push("Email");
  if(row_num > 0){
    sheet.deleteRows(1, row_num);
  }
  
  for(var i=0;i<subjects.length;i++){
    subject_arr.push(subjects[i][0]);
    type_arr.push(types[i][0]);
  }
  subject_arr.push("その他");
  var startTime = ruleSheet.getRange('D2').getValue();
  var endTime = ruleSheet.getRange('E2').getValue();
  if(startTime == '' || endTime == ''){
     var date = new Date();
     startTime = new Date(date.getFullYear(), date.getMonth(), 1);
     endTime = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }
  endTime.setHours(23);
  endTime.setMinutes(59);
  endTime.setSeconds(59);
  var optionalArgs = {
    timeMin: startTime.toISOString(),
    timeMax: endTime.toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime'
  };
  
    var value_arr = [];
    for(var i=0;i<type_arr.length;i++){
      value_arr[i+1] = 0;
    }
    value_arr[0] = calendarId;
    var response = Calendar.Events.list(calendarId, optionalArgs);
    var events = response.items;
    
    for each(var evt in events){
      if(!evt.start.dateTime || evt.summary === undefined)
      {
        continue;
      }
      end = new Date(formatTime((evt.end.dateTime).slice(0,19)));
      start = new Date(formatTime((evt.start.dateTime).slice(0,19)));
      time = end - start;
      for(var i=0;i<type_arr.length;i++){
        if(evt.summary.lastIndexOf(type_arr[i], 0) === 0){
          value_arr[i+1] = value_arr[i+1] + time;
        }
      }
    }

    for(var i=1;i<value_arr.length;i++){
      value_arr[i] = secondsToString(value_arr[i]/1000);
      other_time = other_time - value_arr[i];
    }
    value_arr.push(other_time);
    for(var i=0;i<subject_arr.length;i++){
      sheet.appendRow([subject_arr[i],value_arr[i]]);
    }  
    
    //draw chart
    var lChartBuilder = sheet.newChart();
    
    lChartBuilder.addRange(sheet.getRange('A2:B'+sheet.getLastRow()+''));
    lChartBuilder.setOption("title", calendarId);
    
    var lChart = lChartBuilder.asPieChart().setPosition(4, 4, 0, 0).set3D().build();
    sheet.insertChart(lChart);
}