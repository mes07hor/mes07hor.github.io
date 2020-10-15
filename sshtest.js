var mysql = require('mysql2');
var Client = require('ssh2').Client;

var ssh = new Client();
ssh.on('ready', function () {
    ssh.forwardOut(
        // 送信元アドレス。これは通常、任意の有効なアドレスです。(基本的にこのままでOK)
        '127.0.0.1',
        // 送信元ポート。これは任意の有効なポート番号です。(基本的にこのままでOK)
        12345,
        // 宛先アドレス（localhostはSSHサーバーを指します）
        'localhost',
        // 宛先ポート
        3306,
        function (err, stream) {
            if (err) {
                console.error('forwardOut Error: ' + err);
                return;
            }
            console.log('forwardOut: ready!');
            var connection = mysql.createConnection({
                host: 'mysql-host',
                user: 'username',
                password: '●●●●●●●●●●●●●●●●●',
                database: 'dbName',
                stream: stream // <--- this is the important part
            });
            // use sql connection as usual
            connection.connect();
            // usersというテーブルから5レコード取得
            connection.query('SELECT * from users LIMIT 5', function (err, result) {
                if (err) { console.log('err: ' + err); }

                console.log(result);
                connection.end();
            });
        });
}).connect({
    // ssh connection config ...
    host: 'sshHost',
    port: sshPort,
    username: 'sshName',
    privateKey: require('fs').readFileSync('/Users/<NAME>/.ssh/id_rsa'),
    passphrase: '●●●●●●●●●●●●●●●●●'
});