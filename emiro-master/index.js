const Discord = require("discord.js");
const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const colors = require("colors");
const fs = require("fs");
const emojis = require("./config/emojis.json")
const config = require("./config/config.json")
// require('canvas').registerFont("Genta.ttf", {
//   family: "Genta"
// }); //loading a font

// client define
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10, 
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  disableEveryone: true,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  presence: {
    status: "dnd",
  }
});
module.exports = client;

const mongoose = require("mongoose");
mongoose
  .connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(console.log(
    `MangoDB is Connect`
  ));


client.setMaxListeners(50);
require('events').defaultMaxListeners = 50;

// //Loading discord-buttons
const dbs = require('discord-buttons');
dbs(client);


// Global Variables
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.category = fs.readdirSync("./commands/");
client.db = require('quick.db')


function requirehandlers() {
  client.basicshandlers = Array(
    "command", "events", "distube"
  );
  client.basicshandlers.forEach(handler => {
    try { require(`./handlers/${handler}`)(client); } catch (e) { console.log(e) }
  });
}
requirehandlers();





client.on("guildCreate", guild => {
  let serverid = client.channels.cache.get(config.idlog);
  if (guild.memberCount < 110) return serverid.send(`\`\`\`${guild.name}: ${guild.id}\`\`\``);
  let channel = client.channels.cache.get(config.idlog);
  const embed = new Discord.MessageEmbed()
    //.setTitle("Hello Mr." + "<@" + message.author.id + ">")
    .setThumbnail()
    .setAuthor(guild.name, guild.iconURL())
    .setColor(config.color).setDescription(`
    
> \`\`\`New Invites in: ${guild.name} \`\`\`
> \`\`\`Owner Server: ${guild.owner.user.username}\`\`\`
> \`\`\`ID Servers: ${guild.id}\`\`\`
> \`\`\`Server Users: ${guild.memberCount}\`\`\`
> \`\`\`Server Count: ${client.guilds.cache.size}\`\`\`
    `);
    
 /* const embed2 = new Discord.MessageEmbed()
    //.setTitle("Hello Mr." + "<@" + message.author.id + ">")
    .setThumbnail()
    //.setAuthor(guild.name, guild.iconURL())
    .setColor(config.color).setDescription(`
> Hello Mr.<@${guild.owner.user.id}>,
> Thank you for invite me to __${guild.name}__
    `);
  guild.owner.send(embed2);*/
  channel.send(embed);
});

client.on("guildDelete", guild => {
  //if (guild.memberCount < 110) return;
  let channel = client.channels.cache.get(config.idlog);
  const embed = new Discord.MessageEmbed()
    //.setTitle("Hello Mr." + "<@" + message.author.id + ">")
    .setThumbnail()
    .setAuthor(guild.name, guild.iconURL())
    .setColor(config.color).setDescription(`
    
> \`\`\`Im kickd in thes server:\`\`\`
> __${guild.name}__
> \`\`\`Owner Name:\`\`\` __<@${guild.owner.user.id}>__
> \`\`\`Owner Id:\`\`\`
> __${guild.owner.id}__
> \`\`\`ID Servers:\`\`\` 
> __${guild.id}__
> \`\`\`Server Users:\`\`\`
> __${guild.memberCount}__
    `);
  channel.send(embed);
});



client.on("ready", () => {
  let channel = client.channels.cache.get(config.idlog);
  channel.send(client.user.username + " is ready in " + client.guilds.cache.size + " servers")
});



client.login(config.token);

module.exports.requirehandlers = requirehandlers;