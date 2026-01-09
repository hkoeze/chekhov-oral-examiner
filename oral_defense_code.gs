// CONFIGURATION
// Paste your Google Sheet ID here
const SPREADSHEET_ID = "1Az9LPFedJ6c5qMthY4fKHOSbUyCmpNiEU6gRPIB1dKk";
const SHEET_NAME = "Sheet1"; // Change if your tab is named differently

function doGet(e) {
  // Serves the HTML page when someone visits the URL
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('Oral Defense Portal')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function processSubmission(formObject) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    // 1. Generate a random 4-digit code (1000-9999)
    // In a high-volume app, we'd check for duplicates, but for a class, this is fine.
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    
    // 2. Save to Spreadsheet
    sheet.appendRow([
      new Date(),           // Timestamp
      formObject.name,      // Student Name
      code,                 // The Ticket Code
      formObject.essay,     // The Full Essay
      "Ready for Defense"   // Status
    ]);
    
    // 3. Return the code to the frontend
    return { status: "success", code: code };
    
  } catch (e) {
    return { status: "error", message: e.toString() };
  }
}

// Function to include HTML files in other HTML files (standard pattern)
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
