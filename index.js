const Discord = require('discord.js');
const { token , suits, values} = require('./config.json');
const bot = new Discord.Client();
const {createDeck,test} = require('./dealer.js')



bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();

['event_handler.js', 'command_handler.js'].forEach((handler) => {
  require(`./handlers/${handler}`)(bot, Discord);
});

//adding firebase
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lucius-bot-default-rtdb.firebaseio.com/"
});

//firebase references
let db = admin.database();
let usersRef = db.ref("users");
let channelsRef = db.ref("channels");

channelsRef.on("child_added", (snapshot, prevChildKey) =>{
  let newChannel = snapshot.val();
  console.log(newChannel);
})


// initializeFateDeck();






bot.login(token);

