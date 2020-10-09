# Exentriq-GAIA.node-red-contrib-apn
Apple Push Notification node for Node-RED based on argon/node-apn

## How to create certificates
### Production certificates
```
openssl x509 -in aps_development.cer -inform DER -outform PEM -out cert.pem
openssl pkcs12 -in private_key_notification.p12 -out key.pem -nodes
```
### Sandbox certificates
```
openssl s_client -connect gateway.sandbox.push.apple.com:2195 -cert cert.pem -key key.pem
openssl s_client -connect gateway.push.apple.com:2195 -cert cert.pem -key key.pem
```
## Certificates from p21 File
```
openssl pkcs12 -in Certificates.p12 -out cert.pem -clcerts -nokeys
openssl pkcs12 -in Certificates.p12 -out key.pem -nocerts -nodes
```

# How to run test
```
node test.js
```
