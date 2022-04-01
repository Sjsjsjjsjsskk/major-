const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config/config.json");

module.exports = {
  name: 'ping',
  category: "🔰 Info",
  aliases: ['api'],
  cooldown: 5,
  description: 'Get Bot Ping..',
  usage: 'ping',
  memberpermissions: [" "],
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {

    message.channel.send(
       new MessageEmbed()
       .setColor(config.color)
        .setDescription(`> Ping ${Date.now() - message.createdTimestamp}ms`)
    )
  }
}