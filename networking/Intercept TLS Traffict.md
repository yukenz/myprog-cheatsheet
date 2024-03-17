# Intercept TLS traffic with (Mikrotik || ADB Reverse + IPTables) + PolarProxy + WireShark

<!-- TOC -->

* [Intercept TLS traffic with (Mikrotik || ADB Reverse + IPTables) + PolarProxy + WireShark](#intercept-tls-traffic-with-mikrotik--adb-reverse--iptables--polarproxy--wireshark)
    * [Install polar proxy](#install-polar-proxy)
    * [Generate cert](#generate-cert)
    * [Converting Cert](#converting-cert)
    * [Install Magisk Module](#install-magisk-module)
    * [Inject cert](#inject-cert)
    * [Start Capture](#start-capture)
    * [Rerouting Connection](#rerouting-connection)
        * [Mikrotik](#mikrotik)
        * [ADB Reverse + IPTables](#adb-reverse--iptables)

<!-- TOC -->

## Install polar proxy

Just prebuilt binary :

- https://www.netresec.com/?page=PolarProxy

---

## Generate CA Cert

```shell
# Start PolarProxy with
PolarProxy -p 443,80 --certhttp 10011.
```

Then load http://localhost:10011 in a browser to download PolarProxy’s certificate

---

## Converting Cert DER to PEM and Naming it

```shell
# Convert DER to PEM 
openssl x509 -inform der -in polarproxy.cer -out polarproxy.pem
# Generate name.0 from PEM
openssl x509 -inform pem -subject_hash_old -in polarproxy.pem | head -1
```

rename **polarproxy.pem** to < generatedName >.0

---

## Install Magisk Module for System Cert Injection

Just install in Magisk Manager and reboot

- https://github.com/NVISOsecurity/MagiskTrustUserCerts

---

## Inject Cert

- Move < generatedName >.0 into /data/misc/user/0/cacerts-added with Root X-Plore App.
- Then reboot again
- Make sure Cert has loaded in Setting -> System Certificate

---

## WireShark Start Capture w/ PCAPOverIP

Just start Polar Proxy with command

```shell
PolarProxy -p 443,80 --nontls allow --pcapoverip 57012
```

Then start wireshark and setup Pipes Interface with format

```text
TCP@127.0.0.1:57012
```

and GO!!!

Source :

- https://www.netresec.com/?page=Blog&month=2022-05&post=Real-time-PCAP-over-IP-in-Wireshark

---

## Rerouting Connection

Use Mikrotik or iptables + adb

### Mikrotik

- Add NAT -> chain dstnat tcp 443,80 -> action dst-nat 11.0.0.4 443

### ADB Reverse + IPTables

- ADB Reverse

```shell
adb reverse tcp:443 tcp:443
adb reverse tcp:3883 tcp:3883
```

- IPTables reroute

```shell
adb root
adb shell
iptables -t nat -A OUTPUT -p tcp --dport 443 -j DNAT --to-destination 127.0.0.1:443
iptables -t nat -A OUTPUT -p tcp --dport 3883 -j DNAT --to-destination 127.0.0.1:3883
```