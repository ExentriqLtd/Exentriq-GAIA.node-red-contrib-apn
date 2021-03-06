var apn = require('apn');

var path = '/home/calogero/sviluppo/exentriq/workspace/Exentriq-GAIA/Exentriq-GAIA.node-red-contrib-apn/certs/'
var certificate = path+'cert.pem';
var key = path+'key.pem';
var options = {cert:certificate, key:key, production:true, rejectUnauthorized: false };
var apnConnection = new apn.Provider(options);

let deviceToken = "<e4b5feae 93677c3f 6c6a978c 3c881f44 8eb5003c c932a040 b9dfb19d 8d7bdf97>";
let deviceTokenPushKit = "5a2a813b9372fa165374ee8cb8c439da4f8fb74880e4b1e83379ead9942ef17f";

var note = new apn.Notification();
note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 5;
note.sound = "ping.aiff";
note.alert = "\uD83D\uDCE7 \u2709 You have a new message";

note.payload = {
  messageFrom: 'Luca Inglese',
  data: {
    url: 'https://dev001exe.exentriq.com/ExMeet_rGLPGmZFaQQk5xw9ktttdTKY9WFLc2C5ug',
    roomId: 'rGLPGmZFaQQk5xw9ktttdTKY9WFLc2C5ug',
    handle: '',
    localizedName: 'Demo',
  },
};
note.topic = "com.exentriq.talk"; //"com.exentriq.meet.voip";

apnConnection.send(note, deviceToken.replace(/[ <>]*/g,'')).
  then(r => {
    console.log(r);
    
  })
  .catch(e => console.log(e));
apnConnection.shutdown();
