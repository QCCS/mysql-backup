/**
 * Created by zhouli on 18/9/1
 */
const Backup = require('../src/index.js');
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

// 备份
// Backup.backup(mysqlConf);
// 每间隔时间备份，只剩下3个最近的
Backup.backupWithGaptime(mysqlConf,3000,3);
// 删除文件只剩下3个
// Backup.delBackup(mysqlConf,3);