var Nightmare = require('nightmare');		
var nightmare  = Nightmare({ show: false });
var fs = require('fs');
var login    = process.argv[2];
var password = process.argv[3];
var sku      = process.argv[4]; 
var fileName = process.argv[5];

var https = require('https');
const { Console } = require('console');

ReturnSessionId();

function GetSessionId(login2,password2){
nightmare
  .goto('https://ipro.etm.ru/ns2000/auth_block.php?retPath=/cat/catalog.htm')
  .wait(2000)
  .type('#auth_login', login2)
  .type('#auth_password', password2)
  .click('#auth_link')
  .wait(2000)
  .cookies.get()
  //.end()
  .then(function (result) {
    var sessionID = result[1].value;
    console.log(sessionID);

    if (sku ==undefined) {sku = 'ETM9790788';} 
    if (fileName ==undefined) {fileName = 'OUT/responce.json';} 
    
    var path = 'https://ipro.etm.ru/api/ipro/catalog?page=1&rows=20&val='+sku+'&skl=12000&session-id='+sessionID;
    https.get(path, (res) =>
     {
     // console.log(res.statusCode);
       var body = '';
  
       res.on('data', function(chunk){
           body += chunk;
       });
   
       res.on('end', function(){
           var fbResponse = JSON.parse(body);
       //    console.log("Got a response: ", fbResponse.status);
           fs.writeFileSync(fileName,JSON.stringify(fbResponse));
           return fbResponse;
       });
   }).on('error', function(e){
         console.log("Got an error: ", e);
    });    
  })
  .catch(function (error) {
    console.error('Search failed:', error);
    return '';
  });
}

function ReturnSessionId(){ 
  var login1;
  var password1;
  if (login ==undefined) {login = '87256495nma';}
  if (password1 ==undefined) {password = 'xady0079';}
   var s=GetSessionId(login,password);}

