# Using Random Mac Address on Gnome Based

<!-- TOC -->
* [Using Random Mac Address on Gnome Based](#using-random-mac-address-on-gnome-based)
  * [Add Configuratuin NetworkManager](#add-configuratuin-networkmanager)
  * [Restart NetworkManager](#restart-networkmanager)
  * [Check Result](#check-result)
  * [Manual SetUp for independent SSID](#manual-setup-for-independent-ssid)
<!-- TOC -->

## Add Configuratuin NetworkManager

Edit /etc/NetworkManager/conf.d/00-macrandomize.conf :

```text
[device]
wifi.scan-rand-mac-address=yes

[connection]
wifi.cloned-mac-address=stable
ethernet.cloned-mac-address=stable
connection.stable-id=${CONNECTION}/${BOOT}
```

## Restart NetworkManager

```shell
 systemctl restart NetworkManager
```

## Check Result

```shell
ip link
```

```text
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp2s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN mode DEFAULT group default qlen 1000
    link/ether 52:54:00:5f:d5:4e brd ff:ff:ff:ff:ff:ff
3: wlp1s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DORMANT group default qlen 1000
    link/ether 52:54:00:03:23:59 brd ff:ff:ff:ff:ff:ff
```

## Manual SetUp for independent SSID

```shell
# Find WiFi Known UUID
nmcli c | grep wifi
# See props cloned
nmcli c show 5f4b9f75-9e41-47f8-8bac-25dae779cd87 | grep cloned
# Modify props
nmcli c modify 5f4b9f75-9e41-47f8-8bac-25dae779cd87 802-11-wireless.cloned-mac-address random
# IFace Down
nmcli c down e8c79829-1848-4563-8e44-466e14a3223d
# IFace Up
nmcli c up e8c79829-1848-4563-8e44-466e14a3223d
```

The Options :

* --
* random
* permanent
* stable

The Result :

```text
$ nmcli c | grep wifi
Amtrak_WiFi    5f4b9f75-9e41-47f8-8bac-25dae779cd87 wifi -- 
StaplesHotspot de57940c-32c2-468b-8f96-0a3b9a9b0a5e wifi -- 
MyHome         e8c79829-1848-4563-8e44-466e14a3223d wifi wlp1s0 
...
$ nmcli c show 5f4b9f75-9e41-47f8-8bac-25dae779cd87 | grep cloned
802-11-wireless.cloned-mac-address:     --
$ nmcli c show e8c79829-1848-4563-8e44-466e14a3223d | grep cloned
802-11-wireless.cloned-mac-address:     stable
$ nmcli c | grep wifi
Amtrak_WiFi    5f4b9f75-9e41-47f8-8bac-25dae779cd87 wifi -- 
StaplesHotspot de57940c-32c2-468b-8f96-0a3b9a9b0a5e wifi -- 
MyHome         e8c79829-1848-4563-8e44-466e14a3223d wifi wlp1s0 
...
$ nmcli c show 5f4b9f75-9e41-47f8-8bac-25dae779cd87 | grep cloned
802-11-wireless.cloned-mac-address:     --
$ nmcli c show e8c79829-1848-4563-8e44-466e14a3223d | grep cloned
802-11-wireless.cloned-mac-address:     stable
...
$ nmcli c modify 5f4b9f75-9e41-47f8-8bac-25dae779cd87 802-11-wireless.cloned-mac-address random
$ nmcli c modify e8c79829-1848-4563-8e44-466e14a3223d 802-11-wireless.cloned-mac-address permanent
$ nmcli c down e8c79829-1848-4563-8e44-466e14a3223d
$ nmcli c up e8c79829-1848-4563-8e44-466e14a3223d
$ ip link
```