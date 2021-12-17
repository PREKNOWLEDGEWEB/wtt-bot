client.on('message', message => {
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
});