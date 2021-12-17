client.on('message', message => {
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
  function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Resetting...')
    .then(msg => client.destroy())
    .then(() => client.login(process.env['key']));
    process.exit();
  }
}
});