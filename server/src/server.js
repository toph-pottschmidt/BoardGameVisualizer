const { google } = require('googleapis');
const express = require('express');

const PORT = process.env.PORT || 8080;
const SHEET_NAME = process.env.SHEET_NAME || 'Form Responses 7'
const SPREADSHEET_ID = '1eVGV2tAVjZWChEJem6tuSmpnaTpldAAaFsbb0uuh_Ks';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const KEY_FILE = 'credentials.json';

const app = express();

const getAuthorizedSheets = async () => {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: SCOPES
    });
    
    const client = await auth.getClient();
    
    const sheets = google.sheets({
      version: 'v4',
      auth: client,
    });
    
    return { sheets };
};

const initializeServer = () => {
  if (process.argv.includes('--no-server')) {
    console.log('Server disabled.');
    return;
  }

  app.listen(PORT, () => console.log(`Server now listening on PORT ${PORT}`));
};

// Authorize the Sheets API endpoints, then setup local APP server API
getAuthorizedSheets().then(({ sheets }) => {

  // app.use(express.static('client/src/index'));
  // render

  
  // GET specific row
  app.get('/row/:id', (req, res) => {
    console.log('GET row ' + req.params.id)

    
    const { id } = req.params;
    const range = `'${SHEET_NAME}'!${id}:${id}`;
    sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range}, (err, sheetRes) => {
      if (err) {
        console.log('error accessing spreadsheet data' + err);
        res.status(500).end();
        return;
      }
      console.log(sheetRes.data.values.length) // row count
      
      console.log(sheetRes.data.values);
      
      res.status(200);
      res.json({ values: sheetRes.data.values }).end()
    });
  });
  
  // GET row count
  app.get('/rowcount', (req, res) => {
    console.log('GET rowcount');
    
    const range = `'${SHEET_NAME}'!A:A`;
    sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range }, (err, sheetRes) => {
      if (err) {
        console.log('error accessing spreadsheet data' + err);
        res.status(500).end();
        return;
      }
      res.status(200);
      res.json({ count: sheetRes.data.values.length - 1 }).end();
    })
  });
  
  // GET all rows
  app.get('/rows', (req, res) => {
    console.log('GET rows');
    
    const range = `'${SHEET_NAME}'!1:10000`;
    sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range }, (err, sheetRes) => {
      if (err) {
        console.log('error accessing spreadsheet data' + err);
        res.status(500).end();
        return;
      }
      const [headers, ...values] = sheetRes.data.values
      res.status(200);
      res.json({ headers, values }).end();
    })
  });

  
  app.get('/*', (req, res) => {
    console.log('get /');
    // console.log(__dirname)
    // res.sendFile(path.resolve(__dirname, '../../client/public/index.html'));
  });

}).then(() => {
  initializeServer();
});