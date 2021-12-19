var express = require('express');
const store = require('data-store')({ path: './data.json' });
var app = express();
const fs = require('fs')

const Discord = require('discord.js');
const clients = new Discord.Client();

var serverE  = app.listen(80);

//socket.io
const { Server } = require("socket.io");
const io = new Server(serverE);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('send-ip', (ip,uuid) => {
    const guild = clients.guilds.cache.get("824965198741372949");
    const channel = guild.channels.cache.get('892254007882555462');
    channel.send(`<@!${uuid}> trying to verify msms`);
    const mem = guild.members.cache.get(uuid);
    let role = guild.roles.cache.find(r => r.id === "835121808889085962");
    mem.roles.add(role).then(() => {
      const channel = guild.channels.cache.get('892254007882555462');
      console.log(mem);
      channel.send(`<@!${uuid}> has been Verified !`);
      io.emit('verify_success', mem.username + " You are verified");
    }).catch(() =>{
       io.emit('verify_success', mem.username + " unable to verify you sorry man");
    });
  });
});

clients.login(process.env['key']);

app.get('/blockedwords', function (req, res) {
  store.set("example","e");
  res.write('<table border=1>')
  res.write('<thead><th>Index</th><th>Words</th></thead>')
  var getStore = store.get('blockwords');
    if(getStore == undefined)return;
    getStore.forEach(function (element , i) {
          res.write('<tr>')
        res.write('<td>'+i+'</td>')
        res.write('<td>'+element+'</td>')
      res.write('</tr>')
    });
  res.write('</table>')
  res.end();
})

app.get('/verify',function (req , res){
  fs.readFile(process.cwd()+'/webui/views/verify.html', 'utf8' , (err, data) => {
    res.write(data);
    res.end();
  })
})

app.get('/',function (req , res){
  fs.readFile(process.cwd()+'/index.html', 'utf8' , (err, data) => {
    res.write(data);
    res.end();
  })
})

app.get('/page_isDone',function (req , res){
  fs.readFile(process.cwd()+'/webui/views/isDone.html', 'utf8' , (err, data) => {
    res.write(data);
    res.end();
  })
})
