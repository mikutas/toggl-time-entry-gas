function doPost(e){
    var jsonStr = e.postData.getDataAsString();
    var data = JSON.parse(jsonStr);
    Logger.log(data);
}
