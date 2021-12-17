// client.on('message', message => {
//   if(message.content === `${prefix}rank`){
//     ctx.restore();
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     // Write "Awesome!"
//     ctx.font = '22px Impact'
//     ctx.fillText(ranks.get(message.author.id) + " - Rank!", 50, 100)
//     ctx.fillStyle = '#0023'
//     ctx.fillRect(0, 0, 1080, 1920)
//     // Draw line under text
//     var text = ctx.measureText(ranks.get(message.author.id) + " - Rank!")
//     ctx.strokeStyle = 'rgba(0,0,0,0.5)'
//     ctx.beginPath()
//     ctx.lineTo(50, 102)
//     ctx.lineTo(50 + text.width, 102)
//     ctx.stroke()

//     // Draw cat with lime helmet
//     loadImage('./rank.png').then((image) => {
//       ctx.drawImage(image, 50, 0, 70, 70)
//     })
//     setTimeout(function(){
//       canvas.toBuffer((err, buf) => {
//         if (err) throw err 
//           message.channel.send({
//             files: [{
//               attachment: buf,
//               name: 'ranked.jpg'
//             }]
//           })
//           .then(console.log)
//           .catch(console.error);
//       })
//     },200);
//   }
// });