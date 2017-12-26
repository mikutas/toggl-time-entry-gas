function doPost(e){
  var jsonStr = e.postData.getDataAsString();
  var data = JSON.parse(jsonStr);
  Logger.log(data);

  var authData = Utilities.base64Encode(data.user + ':api_token');
  
  if(data.word != "")
  {
    var response = startEntry(data.word, authData);
  }
  else
  {
    var response = stopEntry(authData);
  }
  return ContentService.createTextOutput(response);
}

function startEntry(entryName, authData){
  var startUrl = "https://www.toggl.com/api/v8/time_entries/start";
  var options = {
    'method' : 'post',
    'headers' : {"Authorization" : "Basic " + authData},
    'contentType' : 'application/json',
    'payload' : "{\"time_entry\":{\"description\":\"" + entryName + "\",\"wid\":2035308,\"created_with\":\"Google Apps Script\"}}"
  }
  var response = UrlFetchApp.fetch(startUrl, options);
  return response;
}

function stopEntry(authData){
  var entry_id = getEntryId(authData);
  Logger.log(entry_id);
  var response = stopEntryById(entry_id, authData);
  return response;
}

function getEntryId(authData){
  var currentUrl = "https://www.toggl.com/api/v8/time_entries/current";
  var options = {
    'headers' : {"Authorization" : "Basic " + authData}
  }
  var response = UrlFetchApp.fetch(currentUrl, options);
  var json = JSON.parse(response.getContentText());
  return json.data.id;
}

function stopEntryById(id, authData){
  var stopUrl = "https://www.toggl.com/api/v8/time_entries/" + id + "/stop";
  var options = {
    'method' : 'put',
    'headers' : {"Authorization" : "Basic " + authData},
    'contentType' : 'application/json'
  }
  var response = UrlFetchApp.fetch(stopUrl, options);
  return response;
}