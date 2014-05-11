// VMware上のCentOS6で動作させたときの例
var server = ws.listen(8887, function () {
  console.log('\033[96m Server running at 183.181.4.13:8887 \033[39m');
});

//memcache
var memcache = require('memcache');
var client = new memcache.Client();

//errorハンドラ
server.on('uncaughtException', function (err) {
  console.log(d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + err);
});

// クライアントからの接続イベントを処理
server.on('connection', function(socket) {
  // クライアントからのメッセージ受信イベントを処理
  socket.on('message', function(data) {
    // 実行時間を追加
    var data = JSON.parse(data);
    var d = new Date();
    data.time = d.getFullYear()  + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    data = JSON.stringify(data);
    console.log('\033[96m' + data + '\033[39m');
    // 受信したメッセージを全てのクライアントに送信する
    server.clients.forEach(function(client) {
     if (client != null) {
        client.send(data);
     }
    });
  });
});
