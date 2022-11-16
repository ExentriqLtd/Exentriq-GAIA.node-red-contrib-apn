module.exports = function(RED) {

    function Apn(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var apn = require('apn');
        var fs = require("fs");
        var util = require('util');

        try {
        	this.on('input', function(msg) {

            var path = config.path;
            if( path.substr(-1) != "/" ) {
                path += "/";
            }

            var certificate = path+'cert.pem';
            var key = path+'key.pem';

            if(!fs.existsSync(certificate)) {
                node.error("File not found: " + certificate, msg);
                return;
            }
            if(!fs.existsSync(key)) {
                node.error("File not found: " + key, msg);
                return;
            }

            var production = true;
            if (config.hasOwnProperty('destination')) {
                if(config.destination == 'Production'){
                    production = true;
                }
                else{
                    production = false;
                }
            }

            node.log("Production: " + production);

            var options = {cert:certificate, key:key, production:production, rejectUnauthorized: false };

        	var apnConnection = new apn.Provider(options);
            var note = new apn.Notification();

            note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
            if(msg.badge!=null){
                note.badge = msg.badge;
            }
            if(msg.notifitationPayload!=null){
                note.payload = msg.notifitationPayload;
            }
            else{
                note.payload = {'messageFrom': 'Exentriq'};
            }
            if(msg.notificationTopic){
                note.topic = msg.notificationTopic;
            }
            note.sound = "ping.aiff";
            if (msg.sound) {
              note.sound = msg.sound;
            }
            note.alert = msg.payload;

            if(msg.notificationProperties){
                Object.assign(note, msg.notificationProperties);
            }

            node.log("Sending notification:");
            node.log(note);

            var regTokens = [];
            if(Array.isArray(msg.topic)){
                regTokens = msg.topic;
            }
            else{
                regTokens.push(msg.topic);
            }
            var l = regTokens.length;
            for (var i = 0; i < l; i++) {
                try {
                    var regToken = regTokens[i];
                    var cleanToken = regToken.replace(/[ <>]*/g,'');
                    apnConnection.send(note, cleanToken)
                        .then(r => {
                            msg.payload = r;
                            node.send(msg);
                        })
                        .catch(e => {
                            node.error(e);
                        });
                } catch (e) {
                    node.error("Errore during notification sent", e);
                    console.log(e);
                }

            }
            apnConnection.shutdown();
            //node.status({});
        	});
        }
    	catch(e){
    		node.error("ops, there was an error!", msg);
        }
    }

    RED.nodes.registerType("apn",Apn);
}
