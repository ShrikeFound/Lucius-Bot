module.exports = {
  name: 'use',
  description: 'uses a character sheet created through the web app.',
  async execute(bot, message, args) {
    
    const characterID = args[0]
    const admin = require('firebase-admin');
    const guildID = message.channel.guild.id
    const userID = message.author.id
    let db = admin.database();
    let characterRef = db.ref('characters/'+characterID)
    message.reply(args[0]);
    characterRef.child(userID).set({
      approved: false,
      active: false,
      ignored: false,
      user: userID,
      guild: guildID,
      guild_user: guild_ID+"_"+userID,
      guild_name: message.channel.guild.name,
      nick_name: message.channel.guild.name
    })

    console.log("no errors using the use command.");
  }
}