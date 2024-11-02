// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const Twilio = require('twilio');

// Initialize Twilio
const accountSid = 'ACe09884a501131d697a339b74eeddc4b5';
const authToken = '67265a49df3094bc28a7ed1132d19cf0';
const client = new Twilio(accountSid, authToken);

// Initialize Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// WhatsApp bot endpoint
app.post('/whatsapp', (req, res) => {
  const message = req.body;
  const from = message.From;
  const body = message.Body.toLowerCase();

  // Response logic
  if (body.includes('hello')) {
    sendMessage(from, 'Hey sweetheart!');
  } else if (body.includes('how are you')) {
    sendMessage(from, 'I\'m doing great, thanks for asking!');
  } else if (body.includes('i love you')) {
    sendMessage(from, 'Aww, I love you too!');
  } else if (body.includes('good morning')) {
    sendMessage(from, 'Good morning, beautiful!');
  } else if (body.includes('good night')) {
    sendMessage(from, 'Sweet dreams, my love!');
  } else {
    sendMessage(from, 'What\'s up?');
  }

  res.status(200).end();
});

// Send message function
function sendMessage(to, body) {
  client.messages
    .create({
      from: 'whatsapp:263717645397',
      to: `whatsapp:${to}`,
      body,
    })
    .then((message) => console.log(message.sid))
    .done();
}

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Girlfriend AI bot listening on port ${port}`);
});
