client.on('message', message => {
if(message.content === 'pls meme'){
  setTimeout(function(){
    message.channel.send('lol very funny');
  },2000)
}});