MenusManager.on('MENU_CLICKED', (menu) => {
  if(menu.customID === 'cool-custom-id'){
    console.log(menu.values[0])
    if(menu.values[0] == 'value-1'){
      menu.reply('**Moderation** Commands are only for mods :D').then(msg => {
          msg.delete({ timeout: 10000 })
      });
    }
    else
    if(menu.values[0] == 'value-2'){
      menu.reply('**Normal People** Commands are only for normal peoples xdddd :D').then(msg => {
          msg.delete({ timeout: 10000 })
      })
    }
    else
    if(menu.values[0] == 'value-3'){
      menu.reply('**ChatBot** Coming Soooooon').then(msg => {
          msg.delete({ timeout: 10000 })
      })
    }
  }
});
