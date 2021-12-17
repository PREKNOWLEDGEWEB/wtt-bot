client.on('message', message => {
  if(message.content.includes( `${prefix}whois` )){
  const user = message.mentions.users.first() || message.author;
  const whoami = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Profiler')
    .setURL('https://WindowsTechTipsBot.pp25.repl.co')
      
    .setDescription('sudo whois')
    .setThumbnail(user.avatarURL())
    .addFields(
      { name: 'Username', value: `${user.username}`, inline:true },
      { name: 'Usertag', value: `${user.tag}`, inline:true },
      { name: 'ID', value: `${user.id}`, inline:true },
      { name: 'IS Bot', value: `${user.bot}`, inline:true },
      { name: 'Presense', value: `${getStatusType(user.presence.status)}`, inline:true }
    )
    
    //new Date(member.user.createdTimestamp)
    //message.author.createdAt}
    .setTimestamp()
    .setFooter('WTT', user.avatarURL());
    message.channel.send(whoami);
  }
  function getStatusType(txt){
    if(txt == 'idle'){
      return ":crescent_moon: Idle";
    }else if(txt == 'online'){
      return ":green_circle: Online";
    }else if(txt == 'dnd'){
      return ":red_circle:  Do not Disturb";
    }else if(txt == 'offline'){
      return "🔘 Offline ";
    }else if(txt == 'invisible'){
      return "🔘 Offline ";
    }
  }
});