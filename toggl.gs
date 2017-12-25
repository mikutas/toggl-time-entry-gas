function doPost(e){
    var jsonStr = e.ostData.getDataAsString();
    var data = JSON.parse(jsonString);
    Logger.log(data);
}
