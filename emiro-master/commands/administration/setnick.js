const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'setnick',
    aliases: ['nickname'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_NICKNAMES'],
    cooldown: 5,
    description: 'Change Name of Any User',
    usage: '[COMMAND] + [user] + [Name]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        let nickname = args[1];

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

        if (!nickname) {
            return message.reply(
                new MessageEmbed()
                    .setColor(config.color)
                    .setDescription(`Please Provide a Nick Name`)
                    .setFooter(client.user.username,client.user.avatarURL())
            )
        }

        if (nickname.length > 32) {
            return message.reply(
                new MessageEmbed()
                    .setColor(config.color)
                    .setDescription(`Nick is Too Bigger Please Give Less Than 32 Words`)
                    .setFooter(client.user.username,client.user.avatarURL())
            )
        }

        if (user) {
            try {
                const OldName = `\`${user.nickname}\``;
                await user.setNickname(nickname);

                message.channel.send(
                    new MessageEmbed()
                        .setColor(config.color)
                        .setTitle(`ickName Changed`)
                        .setDescription(`<@${user.id}> NickName Successfully Changed!!`)
                        .addField(`> Changed By <@${message.author.id}>`,true)
                        .addField(`> OldName : ${OldName} || > NewName : ${nickname}`,true)
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