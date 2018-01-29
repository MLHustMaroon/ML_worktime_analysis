# Monstar-lab worktime analysis add-on
 This guide is for those who want to customize the add-on, for use only, plase visit the product on Google store [here.](https://chrome.google.com/webstore/detail/%E5%8A%B4%E5%83%8D%E6%99%82%E9%96%93%E5%88%86%E6%9E%90/kghcoeoloccedalaodmpopjlfjpibhba?utm_source=permalink)
 ## Environment:
 ### * Clasp:
  Clasp is an open-source tool, separate from the Apps Script platform, that lets you develop and manage Apps Script projects from your terminal rather than the Apps Script editor.
 The [Google app script document](https://developers.google.com/apps-script/guides/clasp) provides an overview of all clasp features and installation guides.
 ## Installation:
  1. Clone the project using git and cd into project root
  2. After loggin into clasp, run:
  >clasp create \[project name\]
  
  to create a new App Script on your drive. Copy the link that clasp returns.
  
  3. Run: 
  >clasp push
  
  to push all files in current folder to the project you created.
  4. Open browser and paste the link you copied. If you haven't logged in as the same account that using clasp, switch to that account.
 ## Publish:
  The app can be deployed as a webapp, add-on or api, depends on how you want to use it. Refer to [this document](https://developers.google.com/apps-script/concepts/deployments) for details.
