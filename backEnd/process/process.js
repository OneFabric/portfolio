const API = require('../codeFeed/code/main')
const cron = require("node-cron")
const fs = require('fs')

var endpoint = API.apiEndpoint

const time = "0 */30 * * * *" // every half hour

function process() {
    var apiResult =  []

    cron.schedule(
                    time,
                    function() {
                        endPointWrapper() 

                        // remove file if it exists.
                        fs.unlink('./frontEnd/public/feed.txt', (err) => {
                            if (err) {
                              console.error("Problem removing file!: "+err)
                              return
                            }
                        })

                        apiResult.forEach(
                            element => {
                                fs.appendFile('./frontEnd/public/feed.txt',
                                                prettyPrint(element),
                                                function(err,result) {
                                                    if(err) { 
                                                            console.log('error!: Not able to append '+element,err)
                                                        }
                                                    })
                            }
                        )
    
                        }
                    )
    
    
    function endPointWrapper() {
         apiResult = endpoint()
    }


    function prettyPrint(arrayElement) {
        var regexExpRepoName = '\/OneFabric\/(.*)\/commits'
        var regexExpRepoURL = '(.*)->(.*)'

        var repoName = arrayElement.match(regexExpRepoName)[1]
        var url = "<a href=\""+arrayElement.match(regexExpRepoURL)[1]+"\"\>"+repoName+"</a>"
        var description = arrayElement.match(regexExpRepoURL)[2]

        return url+" : "+description +"<br>"
    }
}

module.exports.process = process