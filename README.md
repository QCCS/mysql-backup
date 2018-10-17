# mysql-backup
数据库备份
# 安装
```
npm install mysql-backup-db@latest

```
# 用法实例

每3秒备份一次，只保留最近的3份
```
const Backup = require('./src/index.js');
var config = {
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'database_name',
        port: '3306',
        backupPath:"backupPath"//先创建备份文件夹，把绝对路径写这里,
        // backupPath:"./src/backup-db/"  也可以是相对路径
    }
};
mysqlConf = config.mysql;
//30分支备份
var gapTime = 1000*60*30;
gapTime = 3000;
//最近3份
var count = 3;
Backup.backupWithGaptime(mysqlConf,gapTime,count);

```