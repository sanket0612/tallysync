$(() => {
    const coreService = require('./core');

    $("#test-conn-cloud").on("click", ()=>{coreService.testConnToCloud()});

    $("#test-conn-tally").on("click", () => {
        var ipaddress = document.getElementById('ip-adress-input').value || "localhost";
        coreService.testConnToTally(ipaddress);
    });

    $('#send-request').on('click', () => {
        var ipaddress = document.getElementById('ip-adress-input').value || "localhost";
        var requestBody = document.getElementById('xml-input').value;
        $('#sync-response').text("Sending a request to " + ipaddress);
        coreService.hitTally(ipaddress, requestBody, $('#sync-response'));
    })

    $('#sync-data').on('click', () => {

        var ipaddress = document.getElementById('ip-adress-input').value || "localhost";
        var requestBody = document.getElementById('xml-input').value;

        $('#sync-response').text("Sending a request to " + ipaddress);
        coreService.requestTallyForData(ipaddress, requestBody, $('#sync-response'));
    });

});
