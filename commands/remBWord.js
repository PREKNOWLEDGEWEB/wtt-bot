client.on('message', message => {
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
});