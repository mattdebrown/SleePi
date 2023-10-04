const http = require('http'); // for HTTP
const https = require('https'); // for HTTPS

const options = {
  hostname: 'lampi', // or 'localhost'
  port: 5000, // Change to your server's port
  path: '/clear', // The endpoint you want to send the GET request to
  method: 'POST',
};

const request = http.request(options, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    console.log(data);
    // Handle the response from the server here
  });
});

request.on('error', (error) => {
  console.error(error);
  // Handle any errors that occur during the request
});

// Send the GET request
request.end();
