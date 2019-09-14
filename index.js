'use strict';

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const express = require('express');
const app = express();
const requestify = require('requestify');
const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const ContactMessage = require('viber-bot').Message.Contact;
const PictureMessage = require('viber-bot').Message.Picture;
const VideoMessage = require('viber-bot').Message.Video;
const LocationMessage = require('viber-bot').Message.Location;
const StickerMessage = require('viber-bot').Message.Sticker;
const RichMediaMessage = require('viber-bot').Message.RichMedia;
const KeyboardMessage = require('viber-bot').Message.Keyboard;
const PAT = 'EAAGZBZCPOeEz8BADP2o6eKUrLyoWpSMkalbi92m9tylUymQtrWqwOZAa9WqUQaZAayEUlCvIU1wMxEUoA6rwi3kp3QlBmjBaOE7Bt4l3JZCITaWB5ZCvnm4TBZBMeeYBRm4fx5zOLHjjhnEunRupZB4zKqy16dz9H5Q8HsNopPRCJQZDZD';

const bot = new ViberBot({
	authToken: '49e872d482e7d5f4-26150ff0836449f8-3f0f198008f8c8e6',
	name: "Hyperbeast",
	avatar: "https://dl-media.viber.com/1/share/2/long/vibes/icon/image/0x0/800b/b85aacbdc579999439e781f37f8bec50b1238229df591acc3996c50e97b5800b.jpg" // It is recommended to be 720x720, and no more than 100kb.
});

const KEYBOARD_FRAME = {
   "receiver": "",
   "min_api_version":7,
   "type":"text",
   "text":"",
   "keyboard":{
      "Type":"keyboard",
      "DefaultHeight":false,
      "InputFieldState": "hidden",
      "Buttons":[]
   }
}

const userprofile = []
// Perfect! Now here's the key part:
bot.on(BotEvents.CONVERSATION_STARTED, (userProfile, isSubscribed, context, onFinish) => {
	const uPF = userProfile.userProfile;
	userprofile.push(uPF);
  let button = {
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
  KEYBOARD_FRAME.receiver = uPF.id;
  KEYBOARD_FRAME.text = "Hi "+uPF.name+"! Welcome! Nice to meet you!";
  KEYBOARD_FRAME.keyboard.Buttons.push(button);
	requestify.request('https://chatapi.viber.com/pa/send_message',{
  method: 'POST',
  body: KEYBOARD_FRAME,
  headers: {
    "X-Viber-Auth-Token": "49e872d482e7d5f4-26150ff0836449f8-3f0f198008f8c8e6"
  }
}
  )
});


bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	// Echo's back the message to the client. Your bot logic should sit here.
	console.log(message)
	if(message.text){
		var userInput = message.text
		var trackingData = message.trackingData
	}
	console.log("userinput", userInput)
	console.log("trackingData", trackingData)

	if(userInput == 'Hi'){
		let button = {
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#4b3695",
			"Text": "<font color='#FFFFFF'>Location Share</font>",
			"InputFieldState": "hidden",
			"TextHAlign": "center",
			"TextVAlign": "middle",
			"ActionType": "location-picker",
			"TextSize": "large",
			"ActionBody": "Hi"
		}
		KEYBOARD_FRAME.Buttons = []
		KEYBOARD_FRAME.Buttons.push(button)
		bot.sendMessage(userprofile[0],[
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
			),
			(new KeyboardMessage(KEYBOARD_FRAME,"","","",minApiVersion))],["LocationShare"])
    
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