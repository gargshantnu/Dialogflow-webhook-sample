const express = require('express')
const {
    WebhookClient
} = require('dialogflow-fulfillment');
const {
    Payload
} = require('dialogflow-fulfillment');

const userService = require("./userService");

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('online'))
app.post('/dialogflow', express.json(), (request, response) => {
    request.body.queryResult.fulfillmentMessages = request.body.queryResult.fulfillmentMessages.map(m => {
        if (!m.platform)
            m.platform = 'PLATFORM_UNSPECIFIED';
        return m;
    });

    const agent = new WebhookClient({
        request,
        response
    });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    function customHandler(agent) {
        return new Promise((resolve, reject) => {
            if (request.body.originalDetectIntentRequest.payload.formData) {
                // If you are here, means user has submitted his details, which we need to update in backend
                const userId = request.body.originalDetectIntentRequest.payload.from;

                const email = request.body.originalDetectIntentRequest.payload.formData.Email;
                const name = request.body.originalDetectIntentRequest.payload.formData.Name;
                return userService.updateUserDetails(userId, {
                    email: email,
                    displayName: name
                }).then(response => {
                    // This will merge below payload with original response from DF ES console
                    agent.add(
                        new Payload('PLATFORM_UNSPECIFIED', [{
                            "platform": "kommunicate",
                            "message": "Let us know if you have any more doubts"
                        }])
                    );
                    resolve(1);
                });
            } else {
                return userService.getUserDetails(request.body.originalDetectIntentRequest.payload.from).then(userDetails => {
                    if (userDetails && userDetails.email) {
                        console.log("returning original response without any modifications");
                        // This will merge below payload with original response from DF ES console
                        agent.add(
                            new Payload('PLATFORM_UNSPECIFIED', [{
                                "platform": "kommunicate",
                                "message": "Let us know if you have any more doubts"
                            }])
                        );
                        resolve(1);
                    } else {
                        // ask use for info i.e. show form
                        agent.add(`Submit your details`);
                        agent.add(
                            new Payload('PLATFORM_UNSPECIFIED', [{
                                "platform": "kommunicate",
                                "metadata": {
                                    "contentType": "300",
                                    "templateId": "12",
                                    "payload": [{
                                            "type": "text",
                                            "data": {
                                                "label": "Name",
                                                "placeholder": "Enter your name",
                                                "validation": {
                                                    "regex": "[A-Za-z0-9]",
                                                    "errorText": "Field is mandatory"
                                                }
                                            }
                                        },
                                        {
                                            "type": "text",
                                            "data": {
                                                "label": "Email",
                                                "placeholder": "Enter your email",
                                                "validation": {
                                                    "regex": "^(([^<>()\\[\\]\\.;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
                                                    "errorText": "Invalid Email"
                                                }
                                            }
                                        },
                                        {
                                            "type": "submit",
                                            "data": {
                                                "action": {
                                                    "message": "Form was submitted successfully!",
                                                    "requestType": "postBackToBotPlatform"
                                                },
                                                "type": "submit",
                                                "name": "Submit"
                                            }
                                        }
                                    ]
                                }
                            }])
                        );
                        resolve(1);
                    }
                });
            }
        })
    }

    function welcome(agent) {
        console.log("this is my custom welcome msg", JSON.stringify(request.body.originalDetectIntentRequest));
        // const displayName = request.body.originalDetectIntentRequest.payload.displayName;
        // const userId = request.body.originalDetectIntentRequest.payload.userId;
        // agent.add(`Welcome my friend displayName: ${displayName}, userId: ${userId} !`);
        agent.add(new Payload("PLATFORM_UNSPECIFIED", [{
            "message": "Do you want more updates?",
            "platform": "kommunicate",
            "metadata": {
                "contentType": "300",
                "templateId": "6",
                "payload": [{
                    "title": "Yes",
                    "message": "Cool! send me more."
                }, {
                    "title": "No",
                    "message": "Not at all",
                    "replyMetadata": {
                        "KM_CHAT_CONTEXT": {
                            "buttonClicked": true
                        }
                    }
                }]
            }
        }]));
    }

    let intentMap = new Map();

    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback)

    intentMap.set('B1 - custom', customHandler);
    intentMap.set('B1 - custom-2', customHandler);
    intentMap.set('B1 - custom-3', customHandler);
    intentMap.set('B1 - custom-4', customHandler);

    agent.handleRequest(intentMap);
});



app.listen(port, () => {
    console.log("Server started at port: ", port);
});
