module.exports = {
  name: 'help',
  description: 'List bot commands and their descriptions',
  async execute(bot,message, args) {
    let help_message = "commands:\n"
    bot.commands.forEach((values,key)=>{
      help_message += ("**!" + key + ":** " + values["description"]+"\n");
    })
    message.author.send(help_message);
    console.log(help_message);
  }
}