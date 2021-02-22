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
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENTS 
  };
admin.initializeApp(firebaseConfig);

//firebase references
let db = admin.database();
let channelsRef = db.ref("channels");

channelsRef.on("child_added", (snapshot, prevChildKey) =>{
  let newChannel = snapshot.val();
  console.log(newChannel.id);
})

bot.login(process.env.BOT_TOKEN);

