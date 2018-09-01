/**
 * Created by zhouli on 18/9/1
 */
const Backup = require('../src/index.js');
const config = require('../config/config.js');

mysqlConf = config.mysql;

// 备份
// Backup.backup(mysqlConf);
// 每间隔时间备份，只剩下3个最近的
Backup.backupWithGaptime(mysqlConf,3000,3);
// 删除文件只剩下3个
// Backup.delBackup(mysqlConf,3);