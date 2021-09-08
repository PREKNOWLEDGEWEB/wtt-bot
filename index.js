const Discord = require('discord.js');
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require('discord-menus');
const client = new Discord.Client();
const MenusManager = new DiscordMenus(client);
const Memer = require("random-jokes-api");
const ytdl = require("ytdl-core");
const express = require('express')
const Database = require("@replit/database")
require("./webui/webui.js");
const db = new Database()

const queue = new Map();

bodyParser = require("body-parser")
var str_replace = require('str_replace');
const disbut = require('discord-buttons');
disbut(client);
const Quote = require('inspirational-quotes');
const fs = require("fs");
const store = require('data-store')({ path: './data.json' });
client.once('ready', () => {
	console.log('Ready!');
  client.user.setActivity('WTT', { type: 'WATCHING' });
  stat();
  let meme = Memer.meme();
});

function stat(){
  setTimeout(function(){
    client.user.setActivity('Nope Nope Never Again', { type: 'WATCHING' });
    stat();
  },9000);
  setTimeout(function(){
  client.user.setActivity('WindowsTechTips is my Owner', { type: 'WATCHING' });
  },10000)
  setTimeout(function(){
  client.user.setActivity(Quote.getRandomQuote(), { type: 'WATCHING' });
  },100)
}

try{

  let meme = Memer.meme()

  var prefix = 'wtt!';
  var image ='https://cdn.discordapp.com/avatars/841278122123853844/226ec101a25ebfa1e1e5663179ef6367.png?size=128';
  var version = "Beta v2.0.1";

client.on('message', message => {
  const serverQueue = queue.get(message.guild.id);


  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  }


  let meme = Memer.meme();
  blockword();
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
  if(message.author.bot)return;
  //bad words remover
  if(message.content.includes('ass')){
    if(message.content.includes('class')){}else{
      message.delete();
    }
  }
  //end badwords remover
  if(message.content.includes('pls rob <@!841278122123853844>')){
    message.channel.send("Ur trying to rob me what");
  }else if(message.content === 'pls meme'){
      setTimeout(function(){
        message.channel.send('lol very funny');
      },2000)
  }
	if (message.content === `${prefix}ping`) {
		message.channel.send('Pong.');
	}else if(message.content === `${prefix}about`){
    message.channel.send("This bot is made for WindowsTechTips");
  }else if(message.content === `${prefix}help`){
    const myCoolMenu = new MenuBuilder()
    .addLabel('Moderation', { description: 'Click here to know more', value: 'value-1' })
    .addLabel('Normal People', { description: 'xD', value: 'value-2' })
    .addLabel('ChatBot', {
        description: 'OMG', value: 'value-3', emoji: {
            name: '🌌'
        }
    })
    .setMaxValues(1)
    .setMinValues(1)
    .setCustomID('cool-custom-id')
    .setPlaceHolder('Select an option');
    
    const Wtthelp = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Windows Tect Tips')
      .setURL('https://WindowsTechTipsBot.pp25.repl.co')
      .setDescription(`My prefix was ${prefix}`)
      .setThumbnail(image)
      .addFields(
        {name: '**Basic Commands**', value: `Commands for Mods and Non Mods`},
        {name: 'Ping', value: `${prefix}ping`, inline:true},
        {name: 'whoami', value: `${prefix}whoami`, inline:true},
        {name: '**Moderation Commands**', value: `Commands for Mods Only`},
        {name: 'Exec [linux cmds]', value: `exec [linux command]`, inline:true},
        {name: 'kick', value: `${prefix}kick`, inline:true},
        {name: 'mute', value: `${prefix}mute`, inline:true},
        {name: 'unmute', value: `${prefix}unmute`, inline:true},
        {name: 'Block Words', value: `${prefix}addbword`, inline:true},
        {name: '**Music Commands**', value: `Lets Hear the Musics`},
        {name: 'play [yt url or id]', value: `${prefix}play`, inline:true},
        {name: 'skip', value: `${prefix}skip`, inline:true},
        {name: 'stop', value: `${prefix}stop`, inline:true},
      )
      .setFooter(`**${version}**`);
      MenusManager.sendMenu(message, Wtthelp.setDescription('Select'), { menu: myCoolMenu }).then(msg => {
            console.log(msg.id);
            
      })

   // message.channel.send(Wtthelp);
  }else if(message.content === `hi`){
    message.channel.send("Hello");
  }

  if(message.content.startsWith(`${prefix}addMember`)){
    if(message.member.hasPermission('MANAGE_ROLES')){
      //const gRole = message.guild.roles.cache.find(role => role.name === '🎭Members🎭');
      const gRole =  message.guild.roles.cache.find(role => role.name === '🎭Members🎭');
      const member = message.mentions.members.first();
      if(!member){
        message.channel.send(':x: please mention a user');
        return;
      }
      member.roles.add(gRole).catch(error=>{
        message.channel.send(':x: cant assign role');
      });
       message.channel.send(`${member} was a member of WindowsTechTips`);
    }else{
      message.channel.send("You cannot add roles");
    }
  }

  if(message.content.startsWith(`${prefix}mute`)){
    if(message.member.hasPermission('MANAGE_ROLES')){
      //const gRole = message.guild.roles.cache.find(role => role.name === '🎭Members🎭');
      const gRole =  message.guild.roles.cache.find(role => role.name === 'Muted');
      const member = message.mentions.members.first();
      if(!member){
        message.channel.send(':x: please mention a user');
        return;
      }
      member.roles.add(gRole).catch(error=>{
        message.channel.send(':x: Sorry , i cant mute him/her');
      });
       message.channel.send(`${member} Muted Silent /**crackles**`);
    }else{
      message.channel.send("Wait , Who are you , you arent a mod or something else");
    }
  }

  
  if(message.content.startsWith(`${prefix}unmute`)){
    if(message.member.hasPermission('MANAGE_ROLES')){
      //const gRole = message.guild.roles.cache.find(role => role.name === '🎭Members🎭');
      const gRole =  message.guild.roles.cache.find(role => role.name === 'Muted');
      const member = message.mentions.members.first();
      if(!member){
        message.channel.send(':x: please mention a user');
        return;
      }
      member.roles.remove(gRole).catch(error=>{
        message.channel.send(':x: Sorry , i cant mute him/her');
      });
      message.channel.send(`${member} was UnMuted`);
    }else{
      message.channel.send("Wait , Who are you , you arent a mod or something else");
    }
  }

  if(message.content === `${prefix}whoami`){
     const whoami = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Profiler')
        .setURL('https://WindowsTechTipsBot.pp25.repl.co')
      
        .setDescription('Lol you forget that who are you bruh')
        .setThumbnail(message.author.avatarURL())
        .addFields(
          { name: 'Username', value: `${message.author.username}`, inline:true },
          { name: 'Usertag', value: `${message.author.tag}`, inline:true },
          { name: 'ID', value: `${message.author.id}`, inline:true },
          { name: 'IS Bot', value: `${message.author.bot}`, inline:true },
        )
        .setTimestamp()
        .setFooter('WTT', message.author.avatarURL());
    message.channel.send(whoami);

  }


  if(message.content.includes(`${prefix}eval`)){
    if(message.author.id == 808939560041840681){}else{ return message.channel.send("Not a dev"); }
      result = str_replace(`wtt!eval`,'', message.content, true);
      const whoami = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Evaler')
        .setDescription('Evalerrrrrr')
        .setThumbnail(message.author.avatarURL())
        .addFields(
          { name: 'Result :', value: eval(result), inline:true },
        )
        .setTimestamp()
        .setFooter('WTT', message.author.avatarURL());
         message.channel.send(whoami);
        console.log(":trigerred");
  }

  if(message.content.includes(`${prefix}addbword `)){
     if (!message.member.hasPermission("ADMINISTRATOR")) return ;
      result = str_replace(`wtt!addbword `,'', message.content, true);
        var getStore = store.get('blockwords');
        if(store.get('blockwords') == undefined || store.get('blockwords') == []){
        store.set('blockwords', []); 
      }else{
        var savestored = getStore ;
        savestored.push(result);
        console.log(savestored);
        store.set('blockwords', savestored); 
        message.channel.send("Added Blocked Word");
      }
  }

  if(message.content.includes(`${prefix}rembword `)){
     if (!message.member.hasPermission("ADMINISTRATOR")) return ;
      result = str_replace(`wtt!rembword `,'', message.content, true);
      var getStore = Array.from(store.get('blockwords'));
      
    for( var i = 0; i < getStore.length; i++){ 
        if ( getStore[i] === result) { 
            getStore.splice(i, 1); 
        }
    }
    store.set("blockwords",getStore);
    message.channel.send("Deleted Blocked Word");
      
  }

  
  if(message.content.includes(`wtt!exec`)){
    if (message.member.hasPermission("ADMINISTRATOR")) {
      result = str_replace(`wtt!exec`,'', message.content, true);
      const { exec } = require("child_process");
        exec(result, (error, stdout, stderr) => {
        message.channel.send({
          embed: {
            color: 'ORANGE',
            footer:{ text: 'Result below' },
            timestamp: new Date(),
                  description: `Result ${stderr}${stdout}`,
            },
        });     
        });
        }
        else{ 
          message.channel.send(":x: You don't have perms");
        }

  }
  
  // if(message.content.includes(`${prefix}addBlockWord`)){
  //   if (message.member.hasPermission("ADMINISTRATOR")) {
  //     result = str_replace(`${prefix}addBlockWord `,'', message.content, true);
  //     result.replace(`${prefix}addBlockWord`, '');
  //     console.log(result);
  //     var getStore = store.get('blockwords');
  //     if(store.get('blockwords') == undefined || store.get('blockwords') == []){
  //       store.set('blockwords', []); 
  //     }else{
  //       var savestored = getStore ;
  //       savestored.push(result);
  //       console.log(savestored);
  //       store.set('blockwords', savestored); 
  //     }
  //   }
  //   else{ 
  //     message.channel.send(":x: You don't have perms");
  //   }
  // }
  
});




client.on('messageReactionAdd', async (reaction, user, message) => {
      const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs');
      const reactionembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Logging')
        .setURL('https://WindowsTechTipsBot.pp25.repl.co')
        .setDescription(`Message By : ${reaction.message.author}`)
        .setThumbnail(image)
        .addFields(
          { name: 'Message Content ', value: reaction.message.content },
          { name: 'Message reaction count : ', value: `${reaction.count}`, inline:true },
        )
        .setTimestamp()
        .setFooter('Exec', message.author.avatarURL());
      channel.send(reactionembed)
		
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});


client.on('messageDelete', async message => {
	// ignore direct messages
	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	// Since we only have 1 audit log entry in this collection, we can simply grab the first one
	const deletionLog = fetchedLogs.entries.first();
  const { executor, target } = deletionLog;
	// Let's perform a coherence check here and make sure we got *something*
  const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs');
	if (!deletionLog) return console.log("");
  const deleteEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Logging')
    .setURL('https://WindowsTechTipsBot.pp25.repl.co')
    .setDescription(`Message By : ${message.author.tag}`)
    .setThumbnail(image)
    .addFields(
      { name: 'Message Content ', value: message.content },
          
    )
    .setTimestamp()
    .setFooter('Exec', message.author.avatarURL());
  channel.send(deleteEmbed)

	if (target.id === message.author.id) {
		console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);

    message.send(`A message by ${message.author.tag} was deleted by ${executor.tag}.`)
	} else {
		console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
	}
});

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(`${prefix}kick`)) {
  if(message.member.hasPermission('KICK_MEMBERS')){
        if (!message.guild) return;
  if (message.content.startsWith(`${prefix}kick`)) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.members.resolve(user);
      if (member) {
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            message.channel.send(`Successfully kicked ${user.tag}`);
            const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs');
            const deleteEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Logging')
                .setURL('https://WindowsTechTipsBot.pp25.repl.co')
                .setDescription(`Kicked a user`)
                .setThumbnail(image)
                .addFields(
                  { name: 'Kicked ', value: user.tag },
                  { name: `Responsible Mod: :`, value:message.author.username, inline:true },
                )
                .setTimestamp()
                .setFooter('for Wtt only', message.author.avatarURL());
          channel.send(deleteEmbed)
          })
          .catch(err => {
            message.channel.send(':x: I was unable to kick the member');
            console.error(err);
          });
      } else {
        message.channel.send(":x: That user isn't in this Server!");
      }
    } else {
      message.channel.send(":x: You didn't mention the user to kick!");
    }
  }
  }
  }
  
});
MenusManager.on('MENU_CLICKED', (menu) => {
  if(menu.customID === 'cool-custom-id'){
    console.log(menu.values[0])
    if(menu.values[0] == 'value-1'){
      menu.reply('**Moderation** Commands are only for mods :D').then(msg => {
          msg.delete({ timeout: 10000 })
      });
    }else
    if(menu.values[0] == 'value-2'){
      menu.reply('**Normal People** Commands are only for normal peoples xdddd :D').then(msg => {
          msg.delete({ timeout: 10000 })
      })
    }
    else
    if(menu.values[0] == 'value-3'){
      menu.reply('**ChatBot** Coming Soooooon').then(msg => {
          msg.delete({ timeout: 10000 })
      })
    }
  }
});
client.login(process.env['key']);

}catch(e){
  console.log("whoops");
  const inewDiscord = require('discord.js');
  const inewclient = new inewDiscord.Client();  
  inewclient.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('Error Happend : '+e.message, { type: 'WATCHING' });
  });
}


async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
    
  if (!serverQueue)
    return message.channel.send("There is no song that I could stop!");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}