# Exentriq-GAIA.node-red-contrib-apn

Apple Push Notification node

## How to create certificates
### Production certificates
openssl x509 -in aps_development.cer -inform DER -outform PEM -out cert.pem
openssl pkcs12 -in private_key_notification.p12 -out key.pem -nodes
### Sandbox certificates
openssl s_client -connect gateway.sandbox.push.apple.com:2195 -cert cert.pem -key key.pem
openssl s_client -connect gateway.push.apple.com:2195 -cert cert.pem -key key.pem
