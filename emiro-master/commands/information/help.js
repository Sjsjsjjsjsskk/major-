/*const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const config = require("../../config/config.json")
const prefix = require("../../config/config.json").prefix;

module.exports = {
  name: "help",
  aliases: ['h'],
  description: "Shows all available bot commands.",
  run: async (client, message, args) => {


    const embed = new MessageEmbed()

      .setAuthor(message.guild.name, message.guild.iconURL())
      .setColor(config.color)
      .setDescription(`
Hello **${message.author.username}**
to see all commands please [click here](https://emiro.tk/#commands)

prefix bot is : **${config.prefix}**
[click here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) to invite __${client.user.username}__
or join the support server in here [Light Moon.](https://discord.gg/light-moon)
    `)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL())
      .setTimestamp()
    const embed2 = new Discord.MessageEmbed()

      .setColor(config.color)
      .setDescription("Hello sir" + ` please check your DM`)
  }
}*/




const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config/config.json");

module.exports = {
  name: 'help',
  category: "🔰 Info",
  aliases: ['api'],
  cooldown: 5,
  description: 'Get Bot Ping..',
  usage: 'help',
  memberpermissions: [" "],
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {

    message.channel.send(
      new MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setColor(config.color)
      .setDescription(`
Hello **${message.author.username}**
to see all commands please [click here](https://emiro.ml/#commands)

prefix bot is : **${config.prefix}**
[click here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) to invite __${client.user.username}__
or join the support server in here [Light Moon.](https://discord.gg/light-moon)
    `)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL())
      .setTimestamp()


    )
  }
}