var apn = require('apn');

var path = '/Users/adrianotamburo/Desktop/meet_certificates/voip/'
var certificate = path+'cert.pem';
var key = path+'key.pem';
var options = {'cert':certificate, 'key':key, 'production':false };
var apnConnection = new apn.Connection(options);

let deviceToken = "3f6e276249f762742977de77375978ec8096773d26e3d9d358d02b3aac7625b6";
let deviceTokenPushKit = "5a2a813b9372fa165374ee8cb8c439da4f8fb74880e4b1e83379ead9942ef17f";

var note = new apn.Notification();
note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 3;
note.sound = "ping.aiff";
note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
note.payload = {'messageFrom': 'John Appleseed'};
note.topic = "com.exentriq.meet.voip";

var myDevice = new apn.Device(deviceTokenPushKit);
apnConnection.pushNotification(note, myDevice);
apnConnection.shutdown();
