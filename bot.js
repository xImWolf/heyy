const Discord = require("discord.js");
const bot = new Discord.Client({autoReconnect: true});
var talkedRecently = new Set();
//
var fs = require("fs");
var text = fs.readFileSync("./minecraft.txt").toString('utf-8');
var textByLine = text.split("\n")
const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));
// uplay
let uplaytext = fs.readFileSync("./uplay.txt").toString('utf-8');
let uplayarray = uplaytext.split("\n");
//
// origin
let origintext = fs.readFileSync("./origin.txt").toString('utf-8');
let originarray = origintext.split("\n");
//
// spotify
var fs = require("fs");
var text = fs.readFileSync("./spotify.txt").toString('utf-8');
var alt = text.split("\n")
//
var fs = require("fs");
var requireText = require('require-text');
let c = "#ff0000";
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
let prefix = "$";
bot.on("ready", () => {
	console.log(`Logged in as ${bot.user.tag}, ${bot.user.id}`);
	bot.user.setStatus("online");
    bot.user.setActivity(`$help`, {
	  type: "Watching"
	});
});

bot.on("guildCreate", guild => {
bot.channels.get("463016693271232514").send(`
${bot.user.username} joined ${guild.name}

Members: ${guild.members.size}
Channels: ${guild.channels.size}

New guild count: ${bot.guilds.size}
`, {code: "asciidoc"});
});

bot.on("message", message => {
if(message.author.bot) return;
if(message.channel.type === "dm") return;
var giiid = "402499256591712257";
    if(!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {

// comenzi normale

case "say":
if(message.guild.id !== "462635331712319498") return;
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No permission");
try {
message.channel.send(args.join(" ").slice(3));
message.delete();
}
catch(err) {
message.channel.send(`\`\`\`${err}\`\`\``);
}
return;

case "help":
try {
const embed = new Discord.RichEmbed()
.setAuthor(bot.user.tag, bot.user.avatarURL)
.setURL("https://google.com/")
.addField("Commands", `$help - shows up this menu,\n$minecraft - generate an minecraft accounts,\n$spotify - generate an spotify account,\n$uplay - generate an uplay account,\n$say - special command for only one server,\n$eval - only for the developer`)
.addField("Creators", `${bot.users.get(`463024524263161877`).tag} - Developer\n${bot.users.get("279735047366377472").tag} - Refiller\n${bot.users.get("425184699053244416").tag} - Refiller`)
.addField("Info", `[Support Server](https://discord.gg/kYDZGbz)`)
.setColor(message.guild.me.displayHexColor)
message.channel.send(embed)
} catch(err) {
	console.log(err);
	return;
}
break;

case "eval":
    if(message.author.id !== "463024524263161877") return;
    try {
      const code = args.join(" ").slice(4);
      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`\`\`xl\n${clean(err)}\n\`\`\``);
      return;
    }
break;


case "stats":
try {
var embed = new Discord.RichEmbed()
.setAuthor(bot.user.username, bot.user.avatarURL)
.setDescription("I am in " + bot.guilds.size + " guilds with " + bot.users.size + " users.")
message.channel.send({embed});
} catch(err) {
	console.log(err);
	return;
}
break;
		    
case "invite":
try {
var Embed = new Discord.RichEmbed();
Embed.setDescription(`Hey! Do you like me? If you do make sure to invite me\n[Click to invite me.](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=8)`)
Embed.setColor(message.guild.members.get(bot.user.id).displayHexColor)
message.channel.send(Embed)
} catch(err) {
	console.log(err);
	return;
}
break;
		    
case "minecraft":
if(message.guild.id === "462635331712319498") return message.channel.send("You can't use this command on this server!");
if(talkedRecently.has(message.author.id)) {
message.channel.send(`${message.author.tag}, You need to wait at least 5 minutes to type !minecraft again!`);
  return;
	};
talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 300000);
var randomalt = textByLine[Math.floor(Math.random() * textByLine.length)];
var embed = new Discord.RichEmbed()
.setTitle(`Here is ur minecraft alt, sir.`)
.setDescription(randomalt)
.setColor(c)
message.author.sendMessage({embed});
message.reply("check DMs.");
break;

case "uplay":
if(message.guild.id === "462635331712319498") return message.channel.send("You can't use this command on this server!");
if(talkedRecently.has(message.author.id)) {
message.channel.send(`${message.author.tag}, You need to wait at least 5 minutes to type !minecraft again!`);
  return;
	};
talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 300000);
var uplayalt = uplayarray[Math.floor(Math.random() * uplayarray.length)];
var embed = new Discord.RichEmbed()
.setTitle(`Here is ur UPlay account, sir.`)
.setDescription(uplayalt)
.setColor(c)
message.author.sendMessage({embed});
message.reply("check DMs.");
break;

case "origin":
if(message.guild.id === "462635331712319498") return message.channel.send("You can't use this command on this server!");
if(talkedRecently.has(message.author.id)) {
message.channel.send(`${message.author.tag}, You need to wait at least 5 minutes to type !minecraft again!`);
  return;
	};
talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 300000);
var originalt = originarray[Math.floor(Math.random() * originarray.length)];
var embed = new Discord.RichEmbed()
.setTitle(`Here is ur Origin account, sir.`)
.setDescription(originalt)
.setColor(c)
message.author.sendMessage({embed});
message.reply("check DMs.");
break;	

case "verify":
if(message.guild.id !== "462635331712319498") return;
 try {
if(message.member.roles.some(r=>["🚫 | Member"].includes(r.name)))
    return message.reply("You are already verified!");
let user = message.author;
let roleRemove = message.guild.roles.find("name", "Awaiting verify");
let roleAdd = message.guild.roles.find("name", "🚫 | Member");
message.member.removeRole(roleRemove.id);
message.channel.send(`**${message.author.tag}** you have been succesfully verified!`);
message.member.addRole(roleAdd.id);
 } catch(err) {
	 console.log(err)
 }
return;

case "spotify":
if(message.guild.id === "462635331712319498") return message.channel.send("You can't use this command on this server!");
if(talkedRecently.has(message.author.id)) {
message.channel.send(`${message.author.tag}, You need to wait at least 5 minutes to type !spotify again!`);
  return;
	};
talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 300000);
var salt = alt[Math.floor(Math.random() * textByLine.length)];
var embed = new Discord.RichEmbed()
.setTitle(`Here is ur spotify alt, sir.`)
.setDescription(salt)
.setColor(c)
message.author.sendMessage({embed});
message.reply("check DMs.");
break;

};
});

bot.login(process.env.BOT_TOKEN);
