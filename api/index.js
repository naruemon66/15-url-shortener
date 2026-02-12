const express = require('express');
const port = process.env.PORT || 8000;
const app = express();

var SplitFactory = require('@splitsoftware/splitio').SplitFactory;

var factory = SplitFactory({
    core: {
        authorizationKey: process.env.SPLIT_API_KEY
    }
});
var splitClient = factory.client();

var getTreatment = function() {
    return splitClient.getTreatment('ANONYMOUS_USER', 'hello-treatment');
}

splitClient.on(splitClient.Event.SDK_READY, function () {
    console.log('split.io sdk is ready');
    console.log('treatment is: ' + getTreatment());
});

app.get('/', (req, res) => {
    let treatment = getTreatment();
    if (treatment == 'on') {
        res.send('DevOps15-Quiz1');
    } else if (treatment == 'off') {
        res.send('DevOps15-Quiz1');
    } else {
        res.send('DevOps15-Quiz1');
    }
});

app.listen(port, () => { console.log('Our App Is Up And Running!'); });

module.exports = app
