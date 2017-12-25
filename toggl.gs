function doPost(e){
    var jsonStr = e.postData.getDataAsString();
    var data = JSON.parse(jsonString);
    Logger.log(data);
}
