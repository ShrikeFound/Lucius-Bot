const { prefix } = require('../../config.json')
module.exports = (Discord, bot, message) => {
  if (message.content.includes("@here") || message.content.includes("@everyone") || message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(/ +/);
    console.log(`command given: ${args}`)
    const cmd = args.shift().toLowerCase();
    const command = bot.commands.get(cmd);
    if (command) command.execute(bot, message, args, Discord);
    
  } else if (message.mentions.has(bot.user.id)) {
    
    const args = message.content.slice(bot.user.id.length+5).split(/ +/);
    console.log(`command given: ${args}`)
    const cmd = args.shift().toLowerCase();
    const command = bot.commands.get(cmd);
    if (command) command.execute(bot, message, args, Discord);
  }


}