function createBot(){

  const bot = mineflayer.createBot({
    host: process.env['ip'],
    port: 25565,
    username: 'WTTMediaBot',
    version: "1.12"
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    client.on('message', message => {
      if(message.content.includes(`${prefix}botexec`)){
        if(message.author.id == 808939560041840681){}else{ return message.channel.send("Not a dev"); }
        result = str_replace(`wtt!botexec`,'', message.content, true);
        sendMessagetoLogs("Bruh sending","906751448086356040",false);
        bot.chat(result);
      }
    });
    if(message.includes('hi')){
      bot.chat("hi " + username);
    }
  })

  let target = null

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    //target = bot.players[username].entity
    let entity

    switch (message) {
      case 'forward':
        bot.setControlState('forward', true)
        break
      case 'back':
        bot.setControlState('back', true)
        break
      case 'left':
        bot.setControlState('left', true)
        break
      case 'right':
        bot.setControlState('right', true)
        break
      case 'sprint':
        bot.setControlState('sprint', true)
        break
      case 'stop':
        bot.clearControlStates()
        break
      case 'jump':
        bot.setControlState('jump', true)
        bot.setControlState('jump', false)
        break
      case 'jump a lot':
        bot.setControlState('jump', true)
        break
      case 'stop jumping':
        bot.setControlState('jump', false)
        break
      case 'attack':
        entity = bot.nearestEntity()
        if (entity) {
          bot.attack(entity, true)
        } else {
          bot.chat('no nearby entities')
        }
        break
      case 'mount':
        entity = bot.nearestEntity((entity) => { return entity.type === 'object' })
        if (entity) {
          bot.mount(entity)
        } else {
          bot.chat('no nearby objects')
        }
        break
      case 'dismount':
        bot.dismount()
        break
      case 'move vehicle forward':
        bot.moveVehicle(0.0, 1.0)
        break
      case 'move vehicle backward':
        bot.moveVehicle(0.0, -1.0)
        break
      case 'move vehicle left':
        bot.moveVehicle(1.0, 0.0)
        break
      case 'move vehicle right':
        bot.moveVehicle(-1.0, 0.0)
        break
      case 'tp':
        bot.entity.position.y += 10
        break
      case 'pos':
        bot.chat(bot.entity.position.toString())
        break
      case 'yp':
        bot.chat(`Yaw ${bot.entity.yaw}, pitch: ${bot.entity.pitch}`)
        break
    }
  })

  bot.once('spawn', () => {
    // keep your eyes on the target, so creepy!
    setInterval(watchTarget, 50)

    function watchTarget () {
      if (!target) return
      bot.lookAt(target.position.offset(0, target.height, 0))
    }
  })

  bot.on('mount', () => {
    bot.chat(`mounted ${bot.vehicle.objectType}`)
  })

  bot.on('dismount', (vehicle) => {
    bot.chat(`dismounted ${vehicle.objectType}`)
  })

  async function findAndMine(id){
      const block = bot.findBlock({ matching: id, maxDistance: 32 })
      if (block){
          const promiseHack = new Promise((res,rej)=>{
              bot.once('goal_reached', (goal) => {
                  if (!bot.canDigBlock(block)){
                      throw new Error("unable to reack block")
                  }
                  bot.dig(block,false)
                  bot.once("diggingCompleted",(block)=>{
                      res()
                  })
              })
              bot.pathfinder.setGoal(new GoalGetToBlock(block.position.x, block.position.y, block.position.z))
          })
          await promiseHack
          console.log("promise")
          return
      } else {
          throw new Error("no block found")
      }
  }

  // Log errors and kick reasons:
  bot.on('kicked', function(){
    sendMessagetoLogs("Bot was kicked","906751448086356040",false);
    createBot();
  })
  bot.on('error', function(){
    sendMessagetoLogs("Press F Bot crashed will rejoin in 20 seconds","906751448086356040",false);
    createBot();
  })
}

createBot();