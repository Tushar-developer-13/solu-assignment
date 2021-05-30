const http = require('http');
const fetch = require('node-fetch');

const API_URLS = [
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/posts/59',
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts/178',
  'https://jsonplaceholder.typicode.com/comments',
  'https://jsonplaceholder.typicode.com/users/987',
  'https://jsonplaceholder.typicode.com/albums',
  'https://jsonplaceholder.typicode.com/todos/967',
  'https://jsonplaceholder.typicode.com/comments/732',
  'https://jsonplaceholder.typicode.com/photos',
  'https://jsonplaceholder.typicode.com/todos',
];
//create a server object:
http
  .createServer(async (req, res) => {
    const payload = {
      success: true,
      message: 'Nice Message',
      data: {
        success: [],
        failed: [],
      },
    };
    const urlResponses = await Promise.all(API_URLS.map((url) => fetch(url)));
    urlResponses.forEach((item, i) => {
      if (item.status === 200) {
        payload.data.success.push({
          endPoint: API_URLS[i],
          status: 200,
        });
      } else {
        payload.data.failed.push({
          endPoint: API_URLS[i],
          status: 500,
        });
      }
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(payload));
    res.end(); //end the response
  })
  .listen(8000);
