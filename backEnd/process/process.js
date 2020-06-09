const API = require('../codeFeed/code/main')
const cron = require("node-cron")
const fs = require('fs')

var endpoint = API.apiEndpoint

const time = "0 7 * * *"

process()

function process() {
    var apiResult, processResult = []

    cron.schedule(
                    time,
                    function() {
                        wrapper()
                        fs.writeFile('feed.txt',processResult, function(err,result) {
                            if(err) console.log('error!:',err)
                        })
                    }
                 )
    
    function wrapper() {
        endPointWrapper()
        process()
    }
    
    function endPointWrapper() {
        apiResult = endpoint()
    }
    
    function process() {
        for(index in apiResult) {
            processResult[index] = "<p>" + apiResult[index] + "</p>"
        }
    }
}

module.exports.process = process