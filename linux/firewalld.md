```shell

firewall-cmd 
--state
--list-all
--reload
--set-default-zone=$ZONE
 --get-default-zone
--permanent
--list-all-zones
--new-zone=zone
--delete-zone=$ZONE
--set-target=$TARGET
--list-rich-rules
--add-rich-rule='rule'
--remove-rich-rule='rule'
```

```shell
# Setup
firewall-cmd --new-zone=webmethods --permanent
firewall-cmd --set-target=DROP --zone=webmethods --permanent
firewall-cmd --zone=webmethods --permanent --add-rich-rule 'rule family="ipv4" source address="192.168.92.0/24" port port=22 protocol=tcp accept'
firewall-cmd --direct --add-rule ipv4 filter OUTPUT 0 -j DROP
firewall-cmd --reload

# Apply
firewall-cmd --list-all-zone
firewall-cmd --set-default-zone=webmethods
firewall-cmd --reload
firewall-cmd --list-all
```

```shell
# Setup Direct
firewall-cmd --direct --add-rule ipv4 filter OUTPUT 1 -p tcp --dport 443 -j ACCEPT
firewall-cmd --direct --add-rule ipv4 filter OUTPUT 2 -p tcp --dport 53 -j ACCEPT
firewall-cmd --direct --add-rule ipv4 filter OUTPUT 3 -p udp --dport 53 -j ACCEPT
firewall-cmd --direct --add-rule ipv4 filter OUTPUT 4 -j DROP
firewall-cmd --direct --get-all-rules
```