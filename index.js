const Discord = require('discord.js');
const bot = new Discord.Client();



bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();

['event_handler.js', 'command_handler.js'].forEach((handler) => {
  console.log("handlin'",handler);
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
let channelsRef = db.ref("channels");

channelsRef.on("child_added", (snapshot, prevChildKey) =>{
  let newChannel = snapshot.val();
  console.log(newChannel.id);
})

bot.login(process.env.BOT_TOKEN);

