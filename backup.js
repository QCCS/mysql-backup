/**
 * Created by zhouli on 18/9/1
 */
const Backup = require('./src/index.js');
const config = require('./config/config.js');
mysqlConf = config.mysql;
//30分支备份
var gapTime = 1000*60*30;
gapTime = 3000;
//最近3份
var count = 3;
Backup.backupWithGaptime(mysqlConf,gapTime,count);
