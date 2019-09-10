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
	"BgColor": "#ffffff",
	"Buttons": [
		{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#4b3695",
			"Text": "<font color='#FFFFFF'>Get Started</font>",
			"InputFieldState": "hidden",
			"TextHAlign": "center",
			"TextVAlign": "middle",
			"ActionType": "reply",
			"TextSize": "large",
			"ActionBody": "Hi"
		}
	]
};
const minApiVersion = 7;
const welcomeKeyboard = new KeyboardMessage(WELCOME_KEYBOARD,"","","",minApiVersion);
// Perfect! Now here's the key part:
bot.on(BotEvents.CONVERSATION_STARTED, (userProfile, isSubscribed, context, onFinish) => {
	var uPF = userProfile.userProfile
	bot.sendMessage(uPF,[new TextMessage('Hi '+uPF.name+'! Welcome to Hyperbeast!'),
	          welcomeKeyboard],["GetStarted"]).catch(function(error){
		console.log('error', error);
	});
});


bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	// Echo's back the message to the client. Your bot logic should sit here.
	if(message.text){
		var userInput = message.text
		var trackingData = message.trackingData[0]
	}
	console.log("userinput", userInput)
	console.log("trackingData", trackingData)

	if(userInput == 'Hi'){
		bot.sendMessage(uPF,[
			new TextMessage('These are the Hyperbeast Themed products!'),
			new RichMediaMessage(
			{
      "ButtonsGroupColumns": 6,
      "ButtonsGroupRows": 6,
      "BgColor": "#3771b0",
      "Buttons": [ 
       {
        "Columns":6,
        "Rows":3,
        "ActionType":"none",            
        "Image":"https://steamuserimages-a.akamaihd.net/ugc/708527825002071756/D0DC2B2A733A820E5FBD83D6187E3A26BEE57137/"
       },
       {
        "Columns":6,
        "Rows":2,
        "ActionType":"none",
        "BgColor": "#3771b0",
        "Text":"<font color='#ffffff'><b>CS Skins</b></font><font color='#ffffff'><br>Rifles, Pistols</font>",
        "TextSize":"medium",
        "TextVAlign":"middle",
        "TextHAlign":"left"
       },
       {
        "Columns":6,
        "Rows":1,
        "ActionType":"reply",
        "ActionBody":"csskins",
        "Text":"<font color='#ffffff'> View Details </font>",
        "BgColor": "#4b3695",
        "TextSize":"medium",
        "TextVAlign":"middle",
        "TextHAlign":"center"
       },
     {
        "Columns":6,
        "Rows":3,
        "ActionType":"none",           
        "Image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6uj4UiN4jj0XMxYa2XiaIRt20M-wXlWomX35WOGqMO97ilJfAbA"
       },
       {
        "Columns":6,
        "Rows":2,
        "ActionType":"none",
        "BgColor": "#3771b0",
        "Text":"<font color='#ffffff'><b>Hardware</b></font><font color='#ffffff'><br>Mouse, Mousepads</font>",
        "TextSize":"medium",
        "TextVAlign":"middle",
        "TextHAlign":"left"
       },
       {
        "Columns":6,
        "Rows":1,
        "ActionType":"reply",
        "ActionBody":"gaminggear",
        "Text":"<font color='#ffffff'> View Details </font>",
        "BgColor": "#4b3695",
        "TextSize":"medium",
        "TextVAlign":"middle",
        "TextHAlign":"center"
       }
       ]      
       
    }
			)])
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