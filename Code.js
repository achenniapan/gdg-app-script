var base_url = "https://api.github.com/repos/";
var commit_url = "/commits";

var sheetID = "1FkJM7ifjl6_7yAD8mbTZ7TpNZAXzjcxWrabFzZNutAU";
var sheet =   SpreadsheetApp.openById(sheetID).getSheetByName("Sheet1");
var db = PropertiesService.getScriptProperties();

function runme(){
 getCommits('achenniapan/gdg-app-script'); 
}
function getCommits(repo) {
  var api_url = base_url + repo + commit_url; 
  var results = fetch(api_url);
  for each(var result in results){
    console.log(result);
    var commitname=result.commit.author.name;
    var commitmsg=result.commit.message;
    sheet.appendRow([commitname,commitmsg]);
  }
}


var USERNAME = db.getProperty("user");
var PASSWORD = db.getProperty("pass");
var headers = {
  "Authorization" : "Basic " + Utilities.base64Encode(USERNAME + ':' + PASSWORD)
};


var params = {
  "method":"GET",
  "headers":headers,
};


function fetch(url) {
  var response = UrlFetchApp.fetch(url, params);
  var parsed_response = JSON.parse(response);
  return parsed_response;
}