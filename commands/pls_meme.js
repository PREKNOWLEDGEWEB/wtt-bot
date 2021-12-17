client.on('message', message => {
if(message.content === `${prefix}about`){
  message.channel.send("This bot is made for WindowsTechTips");
}});