'use strict';

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const express = require('express');
const app = express();
const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const ContactMessage = require('viber-bot').Message.Contact;
const PictureMessage = require('viber-bot').Message.Picture;
const VideoMessage = require('viber-bot').Message.Video;
const LocationMessage = require('viber-bot').Message.Location;
const StickerMessage = require('viber-bot').Message.Sticker;
const RichMediaMessage = require('viber-bot').Message.RichMedia;
const KeyboardMessage = require('viber-bot').Message.Keyboard;

const bot = new ViberBot({
	authToken: '49e872d482e7d5f4-26150ff0836449f8-3f0f198008f8c8e6',
	name: "Hyperbeast",
	avatar: "https://dl-media.viber.com/1/share/2/long/vibes/icon/image/0x0/800b/b85aacbdc579999439e781f37f8bec50b1238229df591acc3996c50e97b5800b.jpg" // It is recommended to be 720x720, and no more than 100kb.
});

const WELCOME_KEYBOARD = {
	"Type": "keyboard",
	"DefaultHeight": false,
	"BgColor": "#FFFFFF",
	"Buttons": [
		{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#32CD32",
			"Text": "<font color='#FFFFFF'>Get Started</font>",
			"InputFieldState": "hidden",
			"TextHAlign": "center",
			"TextVAlign": "middle",
			"ActionType": "reply",
			"TextSize": "Large",
			"ActionBody": "Hi"
		}
	]
};
const minApiVersion = "6";
const welcomeKeyboard = new KeyboardMessage(WELCOME_KEYBOARD,"GetStarted","","",minApiVersion);
// Perfect! Now here's the key part:
bot.on(BotEvents.CONVERSATION_STARTED, (userProfile, isSubscribed, context, onFinish) =>	
	console.log("onFinish", onFinish)
	);


bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	// Echo's back the message to the client. Your bot logic should sit here.
	console.log(message);
	if(message.TextMessage){
		var userInput = message.TextMessage.text;
		var trackingData = message.TextMessage.trackingData;
		console.log("userinput", userInput);
		console.log("trackingData", trackingData);
	}
	
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