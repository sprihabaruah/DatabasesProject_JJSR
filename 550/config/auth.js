// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '918267344915867', // your App ID
        'clientSecret'  : 'bdba3719bcd3a0c10c2a96896b6c3b79', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

};