# Gen CERT
openssl req -new -x509 -days 3650 -key private.key -out certificate_pem.crt

# CERT and RSA TO PKCS12
openssl pkcs12 -in certificate_pem.crt -inkey private.key -export -name alias_name -out pkcs12_name.p12 -password pass:alias_password

# Info PKCS12
openssl pkcs12 -info -in pkcs12_name.p12

# Generate JKS
/opt/softwareag/jvm/jvm/bin/keytool -genkeypair -alias initkey -keyalg RSA -keysize 2048 -keystore file_keystore.jks -storepass store_password

# Import PKCS12 to JKS Entry
/opt/softwareag/jvm/jvm/bin/keytool -importkeystore -srckeystore pkcs12_name.p12 -srcstoretype PKCS12 -srcalias alias_name -srcstorepass alias_password -destkeystore file_keystore.jks -deststoretype JKS -storepass store_password

# List Entry
/opt/softwareag/jvm/jvm/bin/keytool -list -keystore file_keystore.jks -storepass store_password

# Export Cert
/opt/softwareag/jvm/jvm/bin/keytool -exportcert -alias alias_name -keystore file_keystore.jks -file cert.cer -storepass store_password

# Export PKCS12 from JKS Entry
keytool -importkeystore -srckeystore file_keystore.jks -destkeystore pkcs12_name.p12 -deststoretype PKCS12 -srcalias alias_name -destalias alias_name -storepass store_password

# Delete JKS Entry
/opt/softwareag/jvm/jvm/bin/keytool -delete -alias initkey -keystore file_keystore.jks -storepass store_password