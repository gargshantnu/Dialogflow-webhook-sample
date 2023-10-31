global["__basedir"] = __dirname;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.post('/single-bot', function (req, res) {
    console.log("Req body: ", req.body.matchedIntentName);
    const replies = {
        "Brand-1": {
            "Q1-intent": "A1 of Brand-1 from backend",
            "Q2-intent": "A2 of Brand-1 from backend"
        },
        "Brand-2": {
            "Q1-intent": "A1 of Brand-2 from backend",
            "Q2-intent": "A2 of Brand-2 from backend"
        },
    };
    const reply = replies[req.body.metadata.KM_CHAT_CONTEXT.brand][req.body.matchedIntentName]
    if (reply) {
        return res.status(200).send([{
            "platform": "kommunicate",
            "message": reply
        }]);
    }
    return res.status(200).end();
});


app.post('/welcome', function (req, res) {
    console.log("Req body: ", req.body);
    
    return res.status(200).send(response);
});


app.post('/welcome', function (req, res) {
    console.log("Req body: ", req.body);
    
    return res.status(200).send(response);
});


app.use((err, req, res, next) => {

    console.log("executing error handler", err);
    return res.status(500).send(err);
});

function startApp() {
    app.listen(port, function() {
        console.log("Express server listening on port : " + port);
    });
}

startApp();

module.exports = app;