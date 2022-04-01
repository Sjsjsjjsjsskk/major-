const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../index');
const config = require('../config/config.json')
/** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */


client.on('ready', () => {
  
    client.user.setActivity("Prefix: " + config.prefix + "  |  emiro.ml")
});


