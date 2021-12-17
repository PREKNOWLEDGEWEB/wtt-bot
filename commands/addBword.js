client.on('message', message => {
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
});