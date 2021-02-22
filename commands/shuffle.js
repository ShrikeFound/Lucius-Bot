const {shuffle} = require('../dealer.js')
module.exports = {
  name: 'shuffle',
  description: 'reminds users to use shuffle_fate or shuffle_twist',
  async execute(bot,message, args) { 
      message.reply("For clarity, please use either  'shuffle_twist' or 'shuffle_fate'.");
   }
}