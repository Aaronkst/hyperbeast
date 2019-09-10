'use strict';

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const express = require('express');
const app = express();

const bot = new ViberBot({
	authToken: '49e872d482e7d5f4-26150ff0836449f8-3f0f198008f8c8e6',
	name: "Hyperbeast",
	avatar: "https://dl-media.viber.com/1/share/2/long/vibes/icon/image/0x0/800b/b85aacbdc579999439e781f37f8bec50b1238229df591acc3996c50e97b5800b.jpg" // It is recommended to be 720x720, and no more than 100kb.
});


// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	// Echo's back the message to the client. Your bot logic should sit here.
	console.log(message);
});

const port = process.env.PORT || 3000;
app.use("/webhook", bot.middleware());
app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
  bot.setWebhook(`https://hyperbeast.herokuapp.com/webhook`).catch(error => {
    console.log('Can not set webhook on following server. Is it running?');
    console.error(error);
    process.exit(1);
  });
});