const { exec } = require('child_process');

function sleep()
{
    console.log("screen.sleep()")
    exec('xset dpms force off'); 
}

module.exports =
{
    sleep
}