var mysql = require('mysql2');
var Client = require('ssh2').Client;

var ssh = new Client();
ssh.on('ready', function () {
    ssh.forwardOut(
        // ���M���A�h���X�B����͒ʏ�A�C�ӂ̗L���ȃA�h���X�ł��B(��{�I�ɂ��̂܂܂�OK)
        '127.0.0.1',
        // ���M���|�[�g�B����͔C�ӂ̗L���ȃ|�[�g�ԍ��ł��B(��{�I�ɂ��̂܂܂�OK)
        12345,
        // ����A�h���X�ilocalhost��SSH�T�[�o�[���w���܂��j
        'localhost',
        // ����|�[�g
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
                password: '����������������������������������',
                database: 'dbName',
                stream: stream // <--- this is the important part
            });
            // use sql connection as usual
            connection.connect();
            // users�Ƃ����e�[�u������5���R�[�h�擾
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
    passphrase: '����������������������������������'
});