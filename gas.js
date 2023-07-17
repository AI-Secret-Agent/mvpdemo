function generateContent() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var wpurl = scriptProperties.getProperty('wpurl');
  var userkey = scriptProperties.getProperty('wpkey');
  var proxyUrl = scriptProperties.getProperty('proxyurl');
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getRange(2, 2, sheet.getLastRow() - 1, 2).getValues(); // Adjusted range
  var allSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var titleSheet = allSheets[1]; // Sheets are 0-indexed, so 1 is the second sheet.
  if (!titleSheet) {
    Logger.log('Title sheet not found.');
    return;
  }

  for (var i = 0; i < data.length; i++) {
    var sourcerow = i + 2;
    var title = titleSheet.getRange(sourcerow, 2).getValue();
    var row = data[i];
    var content = row[0]; // Assuming row[0] represents the article

    if (!content) { // If B column cell is empty, skip this iteration
      continue;
    }

    var posttype = sheet.getRange('A37').getValue();
    var systemPrompt = sheet.getRange('A32').getValue().trim();
    var userPrompt = sheet.getRange('A35').getValue().trim();
    var model = sheet.getRange('A39').getValue();
    var maxTokens = sheet.getRange('A41').getValue();
    var temperature = sheet.getRange('A43').getValue();

    var systemPackage = {
      "role": "system",
      "content": systemPrompt
    };

    var userPackage = {
      "role": "user",
      "content": userPrompt + " " + content
    };

    var postData = {
      'model': model,
      'max_tokens': Number(maxTokens),
      'defaultTitle': title,
      'temperature': Number(temperature),
      'messages': [systemPackage, userPackage]
    };

    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'sourcerow': sourcerow,
        'wpurl': wpurl,
        'userkey': userkey,
        'posttype': posttype,
      },
      payload: JSON.stringify(postData),
      muteHttpExceptions: true
    };

    try {
      var response = UrlFetchApp.fetch(proxyUrl, options);
      Logger.log("Response code: " + response.getResponseCode());
      Logger.log("Response headers: " + JSON.stringify(response.getHeaders()));
      Logger.log(response.getContentText());  // Log the raw response

      var content = JSON.parse(response.getContentText());
      var id = content.id;
      var sourcerow = content.sourcerow;
      if (content && content.response) {
        var newText = content.response;
        if (newText) {
          Logger.log('Generated new text: ' + newText);

          // Write newText to column B of the same sheet
          sheet.getRange(sourcerow, 6).setValue(newText);
          sheet.getRange(sourcerow, 5).setValue(id);
        }
      } else {
        // Log error or handle the case where the API response is not as expected
        Logger.log('Unexpected API response', content);
      }
    } catch (error) {
      Logger.log('Error fetching or parsing response: ' + error.message);
    }
  }
}
