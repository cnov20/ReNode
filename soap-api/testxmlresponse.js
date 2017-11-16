const https = require('https');
var parseString = require('xml2js').parseString;

https.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22surat%22)&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        //console.log(JSON.parse(data).explanation);

        parseString(data, function (err, result) {
            console.log(JSON.stringify(result));
        });
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});