const https = require('https');

https.get('https://api.fontshare.com/v2/css?f[]=kihim@400&display=swap', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
