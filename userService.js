const axios = require('axios');
const {
    kommunicateApiKey
} = require("./config");

const getUserDetails = async (userId) => {
    let data = JSON.stringify({
        "userIdList": [userId]
    });

    let config = {
        method: 'post',
        url: 'https://services.kommunicate.io/rest/ws/user/v2/detail',
        headers: {
            'API-KEY': kommunicateApiKey,
            'Content-Type': 'application/json',
        },
        data: data
    };
    return axios(config)
        .then(function (response) {
            console.log("User info: ", JSON.stringify(response.data));
            return response.data.response[0];
        })
        .catch(function (error) {
            console.log(error);
        });
}

const updateUserDetails = async (userId, details) => {
    let config = {
        method: 'post',
        url: 'https://services.kommunicate.io/rest/ws/user/update?elasticUpdate=true&allowEmail=true',
        headers: {
            'API-KEY': kommunicateApiKey,
            'Content-Type': 'application/json',
            'Of-User-Id': userId,
        },
        data: details
    };
    return axios(config)
        .then(function (response) {
            console.log("User details updated: ", JSON.stringify(response.data));
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = {
    getUserDetails,
    updateUserDetails,
}