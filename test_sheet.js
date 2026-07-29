require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

async function test() {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    
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
    
    await sheet.addRow({
      'Timestamp': new Date().toISOString(),
      'Full Name': "Test User",
      'Email': "test@test.com",
      'Phone': "123",
      'Gender': "Male",
      'Age': "25",
      'Country': "Test",
      '30s Video Price From ($)': "1",
      '30s Video Price Till ($)': "2",
      '60s Video Price From ($)': "3",
      '60s Video Price Till ($)': "4"
    });
    
    console.log("Successfully added row!");
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

test();
