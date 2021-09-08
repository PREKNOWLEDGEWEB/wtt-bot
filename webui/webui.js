var express = require('express');
const store = require('data-store')({ path: './data.json' });
var app = express();

app.get('/blockedwords', function (req, res) {
  store.set("example","e");
  res.write('<table border=1>')
  res.write('<thead><th>Index</th><th>Words</th></thead>')
  var getStore = store.get('blockwords');
    if(getStore == undefined)return;
    // getStore.forEach(element , i => {
    //   res.write('<tr>')
    //     res.write('<td>'+i+'</td>')
    //     res.write('<td>'+element+'</td>')
    //   res.write('</tr>')
    // });
    getStore.forEach(function (element , i) {
          res.write('<tr>')
        res.write('<td>'+i+'</td>')
        res.write('<td>'+element+'</td>')
      res.write('</tr>')
    });

  res.write('</table>')
  res.end();
})

app.listen(80, () => {
  console.log(`WebUI Working !`)
})