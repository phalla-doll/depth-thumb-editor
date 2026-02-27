const https = require('https');

https.get('https://api.fontshare.com/v2/fonts?limit=2', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(JSON.stringify(JSON.parse(data), null, 2));
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
