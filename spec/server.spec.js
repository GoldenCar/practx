/*var request = require('request')

//needed to be run in e2e now.
describe('A Practitioner can log in', function() {

    var accessToken;
    it("Should log the practitioner in", function(done){
        request.get({ url: 'https://practxdev.authic.com/users/sign_in'}, function(error, response, body){
            //request(JSON.parse(body).redirect, funwction(error, response, body){
            console.log(response)
            done();
            //})
            // accessToken = JSON.parse(body).access_token
        })
        request.post({
            headers: {
                'content-type' : 'application/x-www-form-urlencoded'},
            url: 'https://practxdev.authic.com/users/sign_in',
                        body: 'user[email]=thomas1bunting@gmail.com&user[password]=thomas12'}, function(error, response, body){
            //request(JSON.parse(body).redirect, funwction(error, response, body){
                console.log(body)
                done();
            //})
           // accessToken = JSON.parse(body).access_token
        })
    })

    it("Should allow the practitioner to get their data", function(done) {
        request.post('http://localhost:3000/user/self',  function(error, response, body){
            console.log(body)
            //expect(JSON.parse(body).name).toEqual("Thomas Bunting");
            done();
        });
    });
});
*/