const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
  name: 'clear',
  aliases: ['bhagja'],
  category: '🚫 Administration',
  memberpermissions: ['BAN_MEMBERS'],
  cooldown: 5,
  description: 'Ban a User From Guild',
  usage: 'ban + <@user> + <reason>',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args, prefix) => {
    if (message.deletable) {
      message.delete();
    }

    // Member doesn't have permissions
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message
        .reply(new MessageEmbed()
          .setColor(config.color)
          .setDescription("`You can't delete messages....`"))
          .then(m => m.delete(5000));
        }

      // Check if args[0] is a number
      if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message
          .reply( new MessageEmbed()
          .setColor(config.color)
          .setDescription("`Yeah.... That's not a numer? I also can't delete 0 messages by the way.`"
          ))
          .then(m => m.delete(5000));
      }

      // Maybe the bot can't delete messages
      if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return message
          .reply( new MessageEmbed()
          .setColor(config.color)
           .setDescription("`Sorryy... I can't delete messages.`"))
          .then(m => m.delete(5000));
      }

      let deleteAmount;

      if (parseInt(args[0]) > 100) {
        deleteAmount = 100;
      } else {
        deleteAmount = parseInt(args[0]);
      }

      message.channel
        .bulkDelete(deleteAmount, true)
        .then(deleted =>
          message.channel.send( new MessageEmbed()
          .setColor(config.color)
           .setDescription(` \`I deleted \`${deleted.size}\` messages.\` `))
        )
        .catch(err => message.reply( new MessageEmbed()
        .setColor(config.color)
         .setDescription(` \`Something went wrong... ${err}\` `)));
    }
  };
