client.on('message', message => {
if(message.content.includes('WTT!')){
  prefix = 'WTT!';
}else{
  prefix = 'wtt!';
}
let meme = Memer.meme();
blockword();
if(message.author.id == 915526924464451584){ 
  if(message.content === 'hi'){
    return message.channel.send('Hello from wtt bot'); 
  }
  if(message.content === 'discord server'){
    return message.channel.send('Join now : discord.gg/5rssDb3aWq'); 
  }
  if(message.content === 'join'){
    return message.channel.send('bruha im a bot'); 
  }
}
if(message.author.bot)return;
if(!message.channel.name.includes("spam")){
  setRank(message.author.id,message.author.username,message);
}
if(message.content === `${prefix}help`){
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
      {name: '__***Basic Commands***__', value: `Commands for Mods and Non Mods`},
      {name: 'Ping', value: `${prefix}ping`, inline:true},
      {name: 'Who is this?', value: `${prefix}whois [mention]`, inline:true},
      {name: '__***Moderation Commands***__', value: `Commands for Mods Only`},
      {name: 'kick', value: `${prefix}kick`, inline:true},
      {name: 'mute', value: `${prefix}mute`, inline:true},
      {name: 'unmute', value: `${prefix}unmute`, inline:true},
      {name: 'Block Words', value: `${prefix}addbword`, inline:true},
      {name: 'Del Block Words', value: `${prefix}rembword [word]`, inline:true},
    
      )
    .setFooter(`**${version}**`);
    MenusManager.sendMenu(message, Wtthelp.setDescription('Select'), { menu: myCoolMenu }).then(msg => {
      console.log(msg.id);    
    })
}
});