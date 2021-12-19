const Discord = require('discord.js');
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require('discord-menus');
const mineflayer = require('mineflayer')
const client = new Discord.Client();
const axios = require('axios');
const MenusManager = new DiscordMenus(client);
const Memer = require("random-jokes-api");
const ytdl = require("ytdl-core");
const express = require('express')
const Database = require("@replit/database")
require("./webui/webui.js");
const db = new Database()
// const { createCanvas, loadImage, registerFont } = require('canvas')
// const canvas = createCanvas(200, 200)
// const ctx = canvas.getContext('2d')
// registerFont('./comp/IMPACT.TTF', { family: 'Comic Sans' })
const queue = new Map();

bodyParser = require("body-parser")
var str_replace = require('str_replace');
const disbut = require('discord-buttons');
disbut(client);

const Quote = require('inspirational-quotes');
const fs = require("fs");
const store = require('data-store')({ path: './data/data.json' });
const ranks = require('data-store')({ path: './data/ranks.json' });

client.once('ready', () => {
	console.log('Ready!');
  client.user.setActivity('hi', { type: 'WATCHING' });
  sendMessagetoLogsMC("Bot started \n Name : WTTMediaBot \n Gender : Female \n Born : 16 / 12 /2021");
  stat();
});

function sendMessagetoLogs(msge,cid,usa = false){
  const guild = client.guilds.cache.get("824965198741372949");
  var channel = guild.channels.cache.get('917810836007948329');
  if(store.get('advancedLoggin') == false)return;
  const Wtthelp = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Windows Tect Tips Advanced Logging')
    .setURL('https://WindowsTechTipsBot.pp25.repl.co')
    .setDescription(msge)
    .setFooter(`**${version}** oh ok creeper`);
  if(usa){
    channel.send(Wtthelp);
  }else{
    channel.send(msge);
  }
  console.log("Log:"+msge);
}

function sendMessagetoLogsMC(msge,cid,usa = false){
  const guild = client.guilds.cache.get("824965198741372949");
  var channel = guild.channels.cache.get('906751448086356040');
  if(store.get('advancedLoggin') == false)return;
  const Wtthelp = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Windows Tect Tips Advanced Logging')
    .setURL('https://wtt-bot.preknowledgeweb.repl.co')
    .setDescription(msge)
    .setFooter(`**${version}** oh ok creeper`);
  if(usa){
    channel.send(Wtthelp);
  }else{
    channel.send(msge);
  }
  console.log("Log:"+msge);
}

function stat(){
  setTimeout(function(){
    client.user.setActivity('Nope Nope Never Again', { type: 'WATCHING' });
    stat();
 //   sendMessagetoLogs("Status Set to : Nope Nope Never Again");
  },9000);
  setTimeout(function(){
    client.user.setActivity('WindowsTechTips is my Owner', { type: 'WATCHING' });
 //   sendMessagetoLogs("Status Set to : WindowsTechTips is my Owner");
  },10000)
  setTimeout(function(){
    var qu = Quote.getRandomQuote();
    client.user.setActivity(qu, { type: 'WATCHING' });
   // sendMessagetoLogs("Status Set to : "+qu);
  },100)
}

client.setMaxListeners(95);

try{
  const fs = require('fs');
  fs.readdir("./commands", (err, files) => {
    files.forEach(file => {
      console.log("Loading ++ "+file);
      fs.readFile('./commands/'+file, 'utf8', function(err, data){
         eval(data);
      });
    });
  });
  let meme = Memer.meme()
  var image ='https://cdn.discordapp.com/avatars/841278122123853844/226ec101a25ebfa1e1e5663179ef6367.png?size=128';
  var version = "Beta v2.0.12";
  function blockword(){
    var getStore = store.get('blockwords');
    if(getStore == undefined)return;
    getStore.forEach(element => {
      if(message.content.includes(element)){
        message.delete().then((m) => {
          m.channel.send("You Message Contains Blacklisted Words").then((m) => {
            m.delete();
          });
        });
      }
    });
  }
  function setRank(clientID,cleintname,msg){
    if(ranks.get(clientID) == undefined){
      ranks.set(clientID,'1');
    }else{
      ranks.set(clientID,Math.abs(parseInt(ranks.get(clientID)) + 1));
      const lvlUP = msg.guild.channels.cache.find(ch => ch.name === '📈level-up');
    }
  }
  var prefix = 'wtt!';


//client.on('message',(message) =>{if(message.author.bot)return;sendMessagetoLogs("Message: \n **"+message.content+"** \n By : "+message.author.tag)})
client.on('guildMemberAdd', (member) => {
  const gRole =  member.guild.roles.cache.find(role => role.name === '👥Members');
  member.send('Hello Psst! Please Verify here > https://wtt-bot.preknowledgeweb.repl.co/verify/?a='+member.id);
  const channel = member.guild.channels.cache.get('891543665313460234');
  channel.send(
   `Welcome ${member.user.tag} ! to WindowsTechTips Community!  we hope you enjoy staying here at this server! Before You start Messaging Do Read The rules! 🙂 `
  );
});

client.login(process.env['key']);
setInterval(function(){
  axios.get('https://wtt-bot.preknowledgeweb.repl.co')
  .then(function (response) {
    //console.log("Zombie Groans!!!");
  }).catch(function (error) {
    console.log("Zombie dies");
  });
},800);
}catch(e){
  console.log("whoops");
}