(
    function() {
        "use strict";
        let express = require('express');
        let app = express();
        app.get('/', function(req, res) {
           res.send("Connected to Fake Tally Server GET");
        });
        app.post('/', (req, res) => {
            console.log(req);
            res.send("Connected to Fake Tally Server POST");
        })
        let server = app.listen(9000, function () {
            console.log('Express server listening on port ' + server.address().port);
        });
        module.exports = app;
    }()
);