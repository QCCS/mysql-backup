/**
 * Created by zhouli on 18/9/1
 */
const Backup = require('./src/index.js');
var config = {
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'database_name',
        port: '3306',
        backupPath:"backupPath"
    }
};
mysqlConf = config.mysql;
//30分支备份
var gapTime = 1000*60*30;
gapTime = 3000;
//最近3份
var count = 3;
Backup.backupWithGaptime(mysqlConf,gapTime,count);
