client.on('message', message => {
if(message.content === `hi`){
  message.channel.send("Hello hi");
}});