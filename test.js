var apn = require('apn');

var path = '/home/calogero/sviluppo/tmp/meet/'
var certificate = path+'cert.pem';
var key = path+'key.pem';
var options = {'cert':certificate, 'key':key, 'production':true };
var apnConnection = new apn.Connection(options);

let deviceToken = "MHKSJBYScvEdGjgrMSTquutcnMSTKNJsspvjrAOHXImwQprlFAdxojLBiRGfvuTH";

var note = new apn.Notification();
note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 3;
note.sound = "ping.aiff";
note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
note.payload = {'messageFrom': 'John Appleseed'};
note.topic = "com.exentriq.meet.voip";

var myDevice = new apn.Device(deviceToken);
apnConnection.pushNotification(note, myDevice);
apnConnection.shutdown();
