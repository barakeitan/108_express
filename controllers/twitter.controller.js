const OAuth = require('oauth-1.0a');
const axios = require('axios');
const crypto = require('crypto');

exports.postTweet = async (tweet = null) => {
    try {
        const oauth = OAuth({
            consumer: {
                key: process.env.TWITTER_CONSUMER_KEY,
                secret: process.env.TWITTER_CONSUMER_SECRET
            },
            signature_method: 'HMAC-SHA1',
            hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
        });

        const token = {
            key: process.env.TWITTER_USER_ACCESS_TOKEN,
            secret: process.env.TWITTER_USER_SECRET,
        };

        const authHeader = oauth.toHeader(oauth.authorize({
            url: 'https://api.twitter.com/2/tweets',
            method: 'POST'
        }, token));

        const data = {"text": tweet ?? "new product has been added to the shop!"};

        await axios.post('https://api.twitter.com/2/tweets',
            data,
            {
                headers: {
                    Authorization: authHeader["Authorization"],
                    'user-agent': "v2CreateTweetJS",
                    'content-type': "application/json",
                    'accept': "application/json"
                }
            }
        );
    }
    catch (err) {
        console.error(err);
    }
}