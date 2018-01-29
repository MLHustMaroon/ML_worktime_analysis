function onInstall(e) {
  generateData();
  onOpen(e);
}

function onOpen(e) {
  var menu = SpreadsheetApp.getUi().createAddonMenu();
  if (e && e.authMode == ScriptApp.AuthMode.NONE) {
    // Generate sample data
    menu.addItem('Generate sample data', 'generateData');
  } else {
    menu.addItem('Reload data', 'reloadData')
    menu.addItem('Re-generate sample data', 'generateData');
  }
  menu.addToUi();
}