const Discord = require("discord.js");
const bot = new Discord.Client();
var talkedRecently = new Set();
//
var fs = require("fs");
var text = fs.readFileSync("./minecraft.txt").toString('utf-8');
var textByLine = text.split("\n")
const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));
// spotify
var fs = require("fs");
var text = fs.readFileSync("./spotify.txt").toString('utf-8');
var alt = text.split("\n")
//
var fs = require("fs");
var requireText = require('require-text');
let c = "#ff0000";
const ids = ["429199866657243146", "279735047366377472", "425184699053244416"];
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
    bot.user.setActivity(`with my dad`, {
    url: "https://twitch.tv/wolfyyxd",
	  type: "Streaming"
	});
});

bot.on("guildCreate", guild => {
  let embed = new Discord.RichEmbed()
  .setAuthor(bot.user.tag, bot.user.avatarURL)
  .setTitle("I joined " + guild.name)
  .addField("Members", guild.members.size, true)
  .addField("ID", guild.id, true)
  .addField("Owner", guild.owner.user.username, true)
  .setTimestamp()
  .setColor(guild.members.get(bot.user.id).displayHexColor)
  .setFooter("Guild count: " + bot.guilds.size, bot.user.avatarURL)
  bot.channels.get("460433077848768532").send({embed})
});

bot.on("message", message => {

if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {

// comenzi normale

case "leave":
try {
  if(message.author.id.includes(ids)) return message.channel.send("You're not allowed to use this.");
  message.channel.send("**Well I'll leave now, bye!!**");
  bot.guilds.get(message.guild.id).leave();
} catch(err) {
  message.channel.send("ERROR");
  return;
}
break;

case "eval":
if(message.author.id != "429199866657243146") return message.channel.send(":octagonal_sign: **Only my developer can access this command.**");
try {
  const code = args.join(" ").slice(4);
  let evaled = eval(code);

  if (typeof evaled !== "string")
    evaled = require("util").inspect(evaled);

  message.channel.send(clean(evaled), {code:"xl"});
} catch (err) {
  message.channel.send(`\`\`\`xl\n${clean(err)}\n\`\`\``);
}
return;

case "minecraft":
if(message.guild.id == "431887036178497546") return message.channel.send("You cant use this bot on this server!");
try {
if(talkedRecently.has(message.author.id)) {
message.channel.send(`${message.author.tag}, You need to wait at least 5 minutes to type !minecraft again!`);
  return;
	};
talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 300000);
var randomalt = textByLine[Math.floor(Math.random() * textByLine.length)];
message.author.send("Keep in mind that, we use ads to purchase new accounts \:)");
var embed = new Discord.RichEmbed()
.setTitle(`Here is your Minecraft account.`)
.setDescription(randomalt)
.setColor(c)
.setTimestamp()
.setFooter("Thanks for using our Public GEN!", message.author.avatarURL)
message.author.send({embed});
message.reply("check DMs.");
} catch(err) {
  message.channel.send("You have DMs locked so I can't message you.");
  return;
}
break;

case "spotify":
    if(message.guild.id == "431887036178497546") return message.channel.send("You cant use this bot on this server!");
try {
if(talkedRecently.has(message.author.id)) {
message.channel.send(`${message.author.tag}, You need to wait at least 5 minutes to type !spotify again!`);
  return;
	};
talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 300000);
var salt = alt[Math.floor(Math.random() * textByLine.length)];
message.author.send("Keep in mind that, we use ads to purchase new accounts \:)");
var embed = new Discord.RichEmbed()
.setTitle(`Here is your Spotify account.`)
.setDescription(salt)
.setTimestamp()
.setFooter("Thanks for using our Public GEN!", message.author.avatarURL)
.setColor(c)
message.author.send({embed});
message.reply("check DMs. (make sure you dont have DMs disabled)");
} catch(err) {
  message.channel.send("You have DMs locked so I can't message you.")
  return;
}
break;
		    
case "stats":
try {
let embed = new Discord.RichEmbed()
.setAuthor("Bot Stats", message.author.avatarURL)
.setDescription("I am in " + bot.guilds.size + " guilds with " + bot.users.size + " users")
.setColor(message.guild.members.get(bot.user.id).displayHexColor)
.setFooter("Random thing :^)", bot.user.avatarURL)
message.channel.send({embed});
} catch (err) {
	console.log(err);
	return;
}
    });

bot.login(process.env.TOKEN);
