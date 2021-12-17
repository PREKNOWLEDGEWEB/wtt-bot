client.on('message', message => {
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
});