const API = require('../codeFeed/code/main')
const cron = require("node-cron")
const fs = require('fs')

var endpoint = API.apiEndpoint

const time = "0 11 * * *" // 11 am, every day

function process() {
    var apiResult = []

    cron.schedule(
                    time,
                    function() {
                        endPointWrapper() 
                        fs.writeFile('./frontEnd/public/feed.txt',apiResult, function(err,result) {
                            if(err) console.log('error!:',err)
                        })
                    }
                 )
    
    function endPointWrapper() {
        apiResult = endpoint()
    }
}

module.exports.process = process