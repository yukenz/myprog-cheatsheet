# Firewall IPFilter in FreeBSD

## Enable IPF at Boot time

Edit /etc/rc.conf dan tambahkan rule berikut

```text
ipfilter_enable="YES"             # Start ipf firewall
ipfilter_rules="/etc/ipf.rules"   # loads rules definition text file
ipv6_ipfilter_rules="/etc/ipf6.rules" # loads rules definition text file for IPv6
ipmon_enable="YES"                # Start IP monitor log
ipmon_flags="-Ds"                 # D = start as daemon
                                  # s = log to syslog
                                  # v = log tcp window, ack, seq
                                  # n = map IP & port to names
```

## Start IPF

```shell
service ipfilter start
```

## Load FW rules based on Files

```shell
ipf -Fa -f /etc/ipf.rules
```

Explanation <br>
-Fa : flushes all the internal rules tables<br>
-f : specifies the file containing the rules to load<br>

## Syntax Rule

| ACTION                                                             | DIRECTION          | OPTIONS                                      | proto PROTO_TYPE     | from SRC_ADDR SRC_PORT     | to DST_ADDR DST_PORT       | TCP_FLAG \ ICMP_TYPE keep state STATE            | 
|--------------------------------------------------------------------|--------------------|----------------------------------------------|----------------------|----------------------------|----------------------------|--------------------------------------------------|
| block<br/>pass<br/>log<br/>count<br/>auth<br/>call<br/>decapsulate | in<br/>out<br/>all | log<br/>quick<br/>on<br/>body<br/>first<br/> | tcp<br/>udp<br/>icmp | all<br/>10.0.0.0/24<br/>80 | all<br/>10.0.0.0/24<br/>80 | S<br/>A<br/>P<br/>F<br/>U<br/>R<br/>C<br/>E<br/> |

Example in :

```shell
less -S /usr/share/examples/ipfilter/BASIC_1.FW
```

```text
block out log quick proto icmp from all to 1.1.1.1

pass in log quick on em1 from any to port = 22
block in quick on em1 from all
```

## Statistics

```shell
# the last time they were reset to zero using
ipf -Z

# Show statistics
ipfstat 
```

Statistic args <br>
-i : Inbound
-o : Outbound
-n : Show Rule Number
-h : Count was matched

## Enable NAT

```text
gateway_enable="YES"              # Enable as LAN gateway
ipnat_enable="YES"                # Start ipnat function
ipnat_rules="/etc/ipnat.rules"    # rules definition file for ipnat
```

### NAT Command

```shell
# delete the current NAT rules and flush the contents of the dynamic translation table.
ipnat -CF -f /etc/ipnat.rules

# display the NAT statistics
ipnat -s

#list the NAT table’s current mappings
ipnat -l

# verbose mode on and display information relating to rule processing and active rules and table entries:
ipnat -v
```

### Syntax
For single address
```text
map IF LAN_IP_RANGE -> PUBLIC_ADDRESS
---
map dc0 192.168.1.0/24 -> 0/32 portmap tcp/udp 20000:60000
map dc0 192.168.1.0/24 -> 0/32 portmap tcp/udp auto
```

For many address
```text
map IF LAN_IP_RANGE -> PUBLIC_ADDRESS
---
map dc0 192.168.1.0/24 -> 204.134.75.0/255.255.255.0
map dc0 192.168.1.0/24 -> 204.134.75.0/24
```


## Logging

Edit /etc/rc.conf dan tambahkan rule berikut

```text
ipmon_flags="-Ds" # D = start as daemon
                  # s = log to syslog
                  # v = log tcp window, ack, seq
                  # n = map IP & port to names
```

### Setup Logging

- Service ipmon start

```shell
service ipmon start
```

- In order to setup IPF to log all data to

```shell
touch /var/log/ipfilter.log
```

- Edit /etc/syslog.conf:

```text
local0.* /var/log/ipfilter.log
```

- Reload syslogd

```shell
service syslogd reload
```

- Do not forget to edit **/etc/newsyslog.conf** to rotate the new log file.

```shell
vim /etc/newsyslog.conf
```

```text
# Daily
/var/log/ipfilter.log                   640  7     *    @T00  JN
```
