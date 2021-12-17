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