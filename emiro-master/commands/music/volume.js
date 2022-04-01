const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "volume",
  aliases: ["s"],
  category: "🎶 Music",
  permissions: " ",
  description: "Manage Volume Of Playing Song",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { channel } = message.member.voice;

    //if member not connected return error
    if (!channel)
      return message.channel
        .send(
          new MessageEmbed()
          .setColor(config.color).setDescription(
            `Please Join Voice Channel To Skip Song`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //If Bot not connected, return error
    if (!message.guild.me.voice.channel)
      return message.channel
        .send(
          new MessageEmbed()
          .setColor(config.color).setDescription(`Nothing Playing In Voice Channel`)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //if they are not in the same channel, return error only check if connected
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.channel
        .send(
          new MessageEmbed()
          .setColor(config.color).setDescription(
            `Please Join My Voice Channel ${message.guild.me.voice.channel.name}`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    if (!args[0])
      return message.reply(
        new MessageEmbed()
        .setColor(config.color)
        .setDescription(
          `Please Enter Valid Volume Number , The Number Must Between 0 to 100`
        )
      );
    //let vol = parseInt(args[0]);
    /* if (vol < 0 || vol > 100) {
       return client.sendTime(
         message.channel,
         "❌ | **Please Choose A Number Between `1-100`**"
     });*/

    distube.setVolume(message, args[0]);

    message.channel
      .send(
        new MessageEmbed()
        .setColor(config.color)
        .setDescription(
          `Song Volume Increased ${args[0]}% By <@${message.author.id}>`
        )
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  },
};