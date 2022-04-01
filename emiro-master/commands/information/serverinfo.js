const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config/config.json");

module.exports = {
  name: 'serverinfo',
  category: "🔰 Info",
  aliases: ['api'],
  cooldown: 5,
  description: 'Get Bot Ping..',
  usage: 'ping',
  memberpermissions: [" "],
  //hi
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {

//const os = require("os");

    let region;
    switch (message.guild.region) {
      case "europe":
        region = "🇪🇺 Europe";
        break;
      case "us-east":
        region = "🇺🇸 us-east";
        break;
      case "us-west":
        region = "🇺🇸 us-west";
        break;
      case "us-south":
        region = "🇺🇸 us-south";
        break;
      case "us-central":
        region = "🇺🇸 us-central";
        break;
    }

    const embed = new Discord.MessageEmbed()
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setColor(config.color)
      .setTitle(`${message.guild.name} server Info`)
      .addFields(
        {
          name: "__Owner__: ",
          value: `${message.guild.owner}`,
          inline: true
        },
        {
          name: "__All Members__: ",
          value: ` ${message.guild.memberCount} users`,
          inline: true
        },
        {
          name: "__Members Online__: ",
          value: ` ${
            message.guild.members.cache.filter(
              m => m.user.presence.status == "online"
            ).size
          } users online`,
          inline: true
        },
        {
          name: "__All Bots__: ",
          value: ` ${
            message.guild.members.cache.filter(m => m.user.bot).size
          } bots`,
          inline: true
        },
        {
          name: "__Creation Date__: ",
          value: message.guild.createdAt.toLocaleDateString("en-us"),
          inline: true
        },
        {
          name: "__Roles Number__: ",
          value: ` ${message.guild.roles.cache.size} roles in this server.`,
          inline: true
        },
        {
          name: `__Region__: `,
          value: region,
          inline: true
        },
        {
          name: `__Verified__: `,
          value: message.guild.verified ? "Server is verified" : `Not verified`,
          inline: true
        },
        {
          name: "__Boosters__: ",
          value:
            message.guild.premiumSubscriptionCount >= 1
              ? ` ${message.guild.premiumSubscriptionCount} Boosters`
              : ` no boosters Found`,
          inline: true
        },
        {
          name: "__Emojis__: ",
          value:
            message.guild.emojis.cache.size >= 1
              ? `All emojis ${message.guild.emojis.cache.size} !`
              : " no emojis Found",
          inline: true
        }
      );
    await message.channel.send(embed);
  }
}