require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');

async function initSheet() {
  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    
    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0];
    
    await sheet.setHeaderRow([
      'Timestamp',
      'Full Name',
      'Email',
      'Phone',
      'Gender',
      'Age',
      'Country',
      '30s Video Price From ($)',
      '30s Video Price Till ($)',
      '60s Video Price From ($)',
      '60s Video Price Till ($)'
    ]);
    
    console.log("Headers successfully added to Google Sheet!");
  } catch (error) {
    console.error("Error setting headers:", error);
  }
}

initSheet();
