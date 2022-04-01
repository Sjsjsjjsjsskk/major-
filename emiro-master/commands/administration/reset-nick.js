const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'resetnick',
    aliases: ['rest-nick'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_NICKNAMES'],
    cooldown: 5,
    description: 'Reset Name of Any User',
    usage: '[COMMAND] + [user]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // if not a user
        if (!user) {
            return message.reply(
                new MessageEmbed()
                    .setColor(config.color)
                    .setDescription(`Please Mention a User to Change Nick Name`)
                    .setFooter(client.user.username,client.user.avatarURL())
            )
        }

        if (user.roles.highest.position > message.member.roles.highest.position) {
            return message.reply(
                new MessageEmbed()
                    .setColor(config.color)
                    .setDescription(`You cant change name of User Which is Equal Your Role`)
                    .setFooter(client.user.username,client.user.avatarURL())
            )
        }


        if (user) {
            try {
                const OldName = `\`${user.nickname}\``;
                await user.setNickname(null);

                message.channel.send(
                    new MessageEmbed()
                        .setColor(config.color)
                        .setTitle(`ickName Reseted`)
                        .setDescription(` <@${user.id}> NickName Successfully Reseted!!`)
                        .addField(`> Changed By <@${message.author.id}>`, true)
                        .addField(`> ldName :- ${OldName} || > NewName :- ${user.user.username}`,true)
                        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                        .setFooter(client.user.username,client.user.avatarURL())
                ).then(msg => msg.delete({ timeout: 5000 }))

            } catch (e) {
                message.channel.send(
                    new MessageEmbed()
                        .setDescription(e)
                )
            }
        }
    }
}