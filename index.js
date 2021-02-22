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
const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID.replace(/\\n/g, '\n'),
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_PROVIDER_CERT_URL
}
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

