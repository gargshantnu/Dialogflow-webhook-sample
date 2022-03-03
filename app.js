'use strict';

// Its for google assistant responses

const {
    dialogflow,
    Suggestions,
} = require('actions-on-google');
const express = require('express');
const bodyParser = require('body-parser');


const port = process.env.PORT || 5000;
const app = dialogflow({ debug: true });


app.intent('Default Welcome Intent', (conv) => {
    conv.ask('Welcome to number echo! Say a number.');
    conv.ask(new Suggestions(["Code chef", "Hacker rank"]));
});
app.intent('webhook', (conv) => {
    conv.ask('i am from webhook');
    conv.ask(new Suggestions(["H1", "H2"]));
});

const expressApp = express().use(bodyParser.json());
expressApp.post("/dialogflow", app);
expressApp.get('/', (req, res) => res.send('online'))

expressApp.listen(port, () => {
    console.log("Server started at port: ", port);
});


// exports.yourAction = functions.https.onRequest(app);
// exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);