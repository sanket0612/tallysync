const xmlParser = require('xml2js');
const fs = require('fs');
const request = require('request');

function uploadData(data, el) {
    var req = {
        rawData: JSON.stringify(data)
    }
    request({
        url: "https://manish-traders.herokuapp.com/sync/party",
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }, (err, response, body) => {
        if (err) {
            console.error(err);
        }else{
            console.log("Successfully uploaded data to cloud");
            let responseBody = response.toJSON();
            console.log(JSON.stringify(responseBody,null,2));
            // fs.writeFileSync("output.json", responseBody.body);
            el.text(JSON.stringify(JSON.parse(response.body),null,2));
            console.log("Saved response in output.json. Also, Response from server -> " + JSON.stringify(responseBody));
        }
    })
}

function requestTallyForData(ipaddress, requestBody, el) {
    request({
        url: `http://${ipaddress}:9000`,
        method: "POST",
        headers: {
            "content-type": "application/xml",  // <--Very important!!!
        },
        body: requestBody
    }, function (error, response, body) {
        if (error)
            el.text("Not able to connect to Tally @ "+ipaddress);
        else {
            el.text("Fetched Data from Server");
            xmlParser.parseString(body, (err,result) => {
                console.log(result);
                uploadData(result,el);
            });
        }
    });
}

function hitTally(ipaddress, requestBody, el) {
    request({
        url: `http://${ipaddress}:9000`,
        method: "POST",
        headers: {
            "content-type": "application/xml",  // <--Very important!!!
        },
        body: requestBody
    }, function (error, response, body) {
        if (error)
            el.text("Not able to connect to Tally");
        else {
            showResponse(response, "Fetched Data from Server->" );
        }
    });
}

function testConnToCloud() {
    var url = "https://manish-traders.herokuapp.com/sync/ping";
    request({
        url: url,
        method: "GET",
        timeout: 5000,
    }, function (error, response, body) {
        if (error)
            $('#sync-response').text("Unable to connect to Tally");
        else {
            showResponse(response, "Successfully able to connect to cloud");
        }
    });
}

function testConnToTally(ipaddress) {
    request({
        url: `http://${ipaddress}:9000`,
        method: "GET",
        timeout: 5000
    }, function (error, response, body) {
        if (error)
            $('#sync-response').text("Unable to connect to Tally @ " + ipaddress);
        else {
            showResponse(response, "Successfully able to connect to Tally @ " + ipaddress);
        }
    });
}

function showResponse(response, msg) {
    let responseBody = response.toJSON();
    if (responseBody.statusCode == "200") {
        console.log(msg);
    }
    $('#sync-response').text(responseBody.body);
}

module.exports = {
    uploadData,
    requestTallyForData,
    hitTally,
    testConnToCloud,
    testConnToTally
};