const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'bans',
    aliases: ['bns'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Fetch all Banned User',
    usage: '[COMMAND]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        const Banned = await message.guild.fetchBans();
        const banmemers = (await Banned).map(member => `${member.user.tag}`).join(`\n`)

        message.channel.send(
            new MessageEmbed()
                .setColor(config.color)
                .setAuthor(message.guild.name,message.guild.iconURL())
                .setDescription(`${banmemers}`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setFooter(client.user.username,client.user.avatarURL())
        )
    }
}