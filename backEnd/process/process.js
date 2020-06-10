const API = require('../codeFeed/code/main')
const cron = require("node-cron")
const fs = require('fs')

var endpoint = API.apiEndpoint

const time = "59 23 * * *" // midnight, every day
const timeTest = "* * * * *"

function process() {
    var apiResult = []

    cron.schedule(
                    timeTest,
                    function() {
                        endPointWrapper()
                        console.log("About to write")
                        fs.writeFile('../../frontEnd/public/feed.txt',apiResult, function(err,result) {
                            if(err) console.log('error!:',err)
                        })
                    }
                 )
    
    function endPointWrapper() {
        console.log("Entering endPointWrapper!")
        apiResult = endpoint()
    }
}

module.exports.process = process