```shell
useradd -m -d /opt/softwareag -c "SoftwareAG" -p sagadmin -s /bin/zsh
sudo firewall-cmd --zone=webmethods --permanent --add-rich-rule 'rule family="ipv4" source address="192.168.92.0/24" port port=22 protocol=tcp accept'

```

```shell
sysctl -a | fgrep fs.file-max
echo "fs.file-max=65536" >> /etc/sysctl.conf

echo "softwareag soft nofile 65536" >> /etc/security/limits.conf
echo "softwareag hard nofile 65536" >> /etc/security/limits.conf

sysctl -a | fgrep vm.max_map_count
echo " vm.max_map_count=262144" >> /etc/sysctl.conf

sysctl -p

ulimit -u
echo "softwareag soft nproc 4096" >> /etc/security/limits.conf
echo "softwareag hard nproc 4096" >> /etc/security/limits.conf
```