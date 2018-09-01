/**
 * Created by zhouli on 18/9/1
 */
const cmd = require('node-cmd');

//备份
function backup(mysqlConf) {
    var nowDate = new Date();
    var suffix = "-" + nowDate.getFullYear() + (nowDate.getMonth() + 1) + nowDate.getDate() + "-" +
        nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds();
    var backCmd = "mysqldump -u" + mysqlConf.user + " -p" +
        mysqlConf.password + " -B " +
        mysqlConf.database + " > " +
        mysqlConf.backupPath + mysqlConf.database + suffix + ".sql";
    console.log("备份数据：");
    cmd.get(backCmd,
        function (err, data, stderr) {
            console.log(stderr);
            if (!err) {
                console.log("备份完成")
            } else {
                console.log('error', err)
            }
        }
    );
}

//每3s备份一次
function backupWithGaptime(mysqlConf, gapTime, count) {
    if(gapTime === undefined || gapTime === null){
        gapTime = 1000*60*30;
    }
    if(count === undefined || count === null){
        count = 3;
    }
    setInterval(function () {
        backup(mysqlConf);
    }, gapTime);

    if (count) {
        //删除文件，等一段时间执行一次就ok
        setInterval(function () {
            delBackup(mysqlConf, count);
        }, gapTime * 10);
    }
}

//删除文件，留下最近几个
function delBackup(mysqlConf, count) {
    getFile(mysqlConf, del);

    function getFile(mysqlConf, callBack) {
        var backCmd = "ls -t " + mysqlConf.backupPath;
        // ls -t 最新的备份放在前面
        cmd.get(backCmd,
            function (err, data, stderr) {
                if (!err) {
                    console.log("获取目录下文件");
                    var files = data.split("\n");
                    files.pop();
                    var len = files.length;
                    if (len > (count)) {
                        for (var i = count - 1; i < len; i++) {
                            callBack(mysqlConf, files[i]);
                        }
                    }
                } else {
                    console.log('error', err)
                }
            }
        );
    }

    function del(mysqlConf, fileName) {
        var backCmd = "rm " + mysqlConf.backupPath + fileName;
        console.log(backCmd)
        cmd.get(backCmd,
            function (err, data, stderr) {
                if (!err) {
                    console.log(fileName + " 删除文件成功");
                } else {
                    console.log('error', err)
                }
            }
        );
    }

}

var Backup = {
    backup: backup,
    backupWithGaptime: backupWithGaptime,
    delBackup: delBackup
};
module.exports = Backup;