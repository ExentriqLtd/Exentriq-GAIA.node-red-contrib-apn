var apn = require('apn');

var path = '/Users/calosan/sviluppo/exentriq/generale/workplace/Exentriq-GAIA.node-red-contrib-apn/certificates/talk_stage_new/'
var certificate = path+'cert.pem';
var key = path+'key.pem';
var options = {cert:certificate, key:key, production:false, rejectUnauthorized: false };
var apnConnection = new apn.Provider(options);

// let deviceToken = "<e4b5feae 93677c3f 6c6a978c 3c881f44 8eb5003c c932a040 b9dfb19d 8d7bdf97>";
let deviceTokenPushKit = "44f94983e4d561f98d4bfae2b3af116fddd3a108e654e59e78af91c02ec29d91";

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
note.topic = "com.exentriq.talknew"; //"com.exentriq.meet.voip";

apnConnection.send(note, deviceTokenPushKit.replace(/[ <>]*/g,'')).
  then(r => {
    console.log(r.failed[0].response);
    
  })
  .catch(e => console.log(e.failed[0].response));
apnConnection.shutdown();
