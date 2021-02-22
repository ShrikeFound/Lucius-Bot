const { prefix } = require('../../config.json')
module.exports = (Discord, bot, message) => {
  console.log(`command given (preliminary): ${message}`)
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  console.log(`command given: ${message}`)
  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = bot.commands.get(cmd);
  if (command) command.execute(bot, message, args, Discord);
}