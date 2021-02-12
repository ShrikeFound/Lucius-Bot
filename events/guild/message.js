const { prefix } = require('../../config.json')
module.exports = (Discord, bot, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  // console.log("command given has prefix ")
  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = bot.commands.get(cmd);
  if (command) command.execute(bot, message, args, Discord);
}