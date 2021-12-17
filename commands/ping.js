client.on('message', message => {
  if (message.content === `${prefix}ping`) {
		message.channel.send('Pong.');
	}
});