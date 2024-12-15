# Server

## Setup Sysctl

```shell
vim /etc/sysctl.conf
sysctl -p
```

```text
net.ipv4.ip_forward=1
net.ipv6.conf.all.forwarding=1
```

## Generate Key Pair

```shell
# Private Key
wg genkey | tee /etc/wireguard/private.key
chmod go= /etc/wireguard/private.key
# Public Key
cat /etc/wireguard/private.key | wg pubkey | tee /etc/wireguard/public.key
```

## Chose IPv6

```shell
TMST=`date +%s%N`
MCHID=`cat /var/lib/dbus/machine-id`
echo $TMST$MCHID | sha1sum | cut -c 31-
# Build like this (fd)69:b88e:c5da::/64
```

## Create Configuration

```shell
vim /etc/wireguard/wg0.conf
```

```text
[Interface]
Address = 172.16.0.1/24, fd69:b88e:c5da::1/64
# DNS = 8.8.8.8, 8.8.4.4, 2001:4860:4860::8888, 2001:4860:4860::8844
#DNS = 127.0.0.1
DNS = 172.16.0.1
PostUp = ufw route allow in on wg0 out on eth0
PostUp = iptables -t nat -I POSTROUTING -o eth0 -j MASQUERADE
PostUp = ip6tables -t nat -I POSTROUTING -o eth0 -j MASQUERADE
PreDown = ufw route delete allow in on wg0 out on eth0
PreDown = iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
PreDown = ip6tables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
ListenPort = 51820
PrivateKey = <Server PrivateKey>

[Peer]
PublicKey = <Peer Public Key>
AllowedIPs = 172.16.0.0/24, fd69:b88e:c5da::/64
PersistentKeepalive = 25
```

## Start Server

```shell
systemctl start wg-quick@wg0.service
```

## Setup Bind9

```shell
cd /etc/bind
cp db.127 db.domain
cp db.127 db.ip
vim db.domain
# - edit db.domain
vim db.ip
# - edit db.ip
vim named.conf.local
# - register DB to zone
```

- db.domain

```text
;
; BIND reverse data file for local loopback interface
;
$TTL    604800
@       IN      SOA     aone.my.id. root.aone.my.id. (
                              1         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
@       IN      NS      aone.my.id.
@       IN      A       172.16.0.1
@       IN      AAAA    fd69:b88e:c5da::1
```

- db.ip

```text
;
; BIND reverse data file for local loopback interface
;
$TTL    604800
@       IN      SOA     aone.my.id. root.aone.my.id. (
                              1         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
@       IN      NS      aone.my.id.
1       IN      PTR     aone.my.id.
; Number 1 is last ip number for reverse
```

- register DB to zone

```text
zone "aone.my.id"{
        type master;
        file "/etc/bind/db.domain";
};

zone "0.16.172.in-addr.arpa"{
        type master;
        file "/etc/bind/db.ip";
};
```

# CLient

Just using default config and add some line

```text
[Interface]
PrivateKey = wOioMBUPyJGJOVPekSf/X4/j8CmSXNUb4H9Co8QHQU4=
Address = 172.16.0.2/24, fd69:b88e:c5da::2/64 #<IP Address with subnet>
DNS = 172.16.0.1, fd69:b88e:c5da::1

[Peer]
PublicKey = RlcKBTOg/apoZvKk0cJDDW4PQEFcqkhnrXdmA9rmmAE=
AllowedIPs = 172.16.0.0/24, fd69:b88e:c5da::/64, 0.0.0.0/0, ::/0
Endpoint = 203.175.10.8:51820 #<Server Wireguard>
```