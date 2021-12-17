function loadComponents(message){
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
        {name: '__***Basic Commands***__', value: `Commands for Mods and Non Mods`},
        {name: 'Ping', value: `${prefix}ping`, inline:true},
        {name: 'whoami', value: `${prefix}whoami`, inline:true},
        {name: '__***Moderation Commands***__', value: `Commands for Mods Only`},
        {name: 'Exec [linux cmds]', value: `exec [linux command]`, inline:true},
        {name: 'kick', value: `${prefix}kick`, inline:true},
        {name: 'mute', value: `${prefix}mute`, inline:true},
        {name: 'unmute', value: `${prefix}unmute`, inline:true},
        {name: 'Block Words', value: `${prefix}addbword`, inline:true},
        {name: 'Del Block Words', value: `${prefix}rembword [word]`, inline:true},
        {name: '__**Music Commands**__', value: `Lets Hear the Musics`},
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
}