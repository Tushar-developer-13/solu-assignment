const fs = require('fs');
const fetch = require('node-fetch');
const readline = require('readline');

// fs.writeFileSync();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter Crypto Name:', async function (currency) {
  const res = await fetch('https://api.bitfinex.com/v2/calc/fx', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ccy1: currency,
      ccy2: 'USD',
    }),
  });
  if (res.status === 200) {
    const data = await res.json();
    fs.writeFileSync('crypto.txt', `Price of ${currency} is $${data[0]}`);
    console.log(`Price of ${currency} is $${data[0]}`);
  } else {
    console.log('No crypto was found for that search term.');
  }
  rl.close();
});
