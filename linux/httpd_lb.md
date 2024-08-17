# Setup Virtual Host Mod Proxy

## Virtual Host Listen

```text
<VirtualHost *:5680>
    ServerAdmin example@library.com
    DocumentRoot "/opt/content/library/"
    DirectoryIndex index.html
    ServerName www.library.com
    ServerAlias library.com
    ErrorLog "logs/library.com-error_log"
    CustomLog "logs/library.com-access_log" combined
</VirtualHost>
```

## Allow Dir Access

```text
<Directory "/opt/content/library/">
   Options Indexes FollowSymlinks
   AllowOverride None
   Require  all granted
</Directory>
```

## Add Balance Manager WebInterface

```text
<Location "/balancer-manager">
    SetHandler balancer-manager
    Require all granted
</Location>
```

## Add Header

```text
Header add Set-Cookie "ROUTEID=.%{BALANCER_WORKER_ROUTE}e; path=/" env=BALANCER_ROUTE_CHANGED
```

- Cookie ini digunakan untuk memastikan bahwa permintaan selanjutnya dari klien yang sama akan diarahkan ke worker yang
  sama.
- Cookie hanya ditambahkan jika lingkungan BALANCER_ROUTE_CHANGED ada, yang terjadi jika route worker berubah.

## Create Proxy balancer and add member

```text
<proxy balancer://library-group>
    BalancerMember http://192.168.56.2:8080/swfchart_jsp_samples/ route=slave1
    BalancerMember http://192.168.1.8:8080/swfchart_jsp_samples/ route=slave2
    ProxySet stickysession=ROUTEID
    ProxySet lbmethod=byrequests
</proxy>
```

## Register path into to Proxy Balancer

```text
ProxyPass "/swfchart_jsp_samples/" "balancer://library-group/"  stickysession=JSESSIONID|jsessionid sc>
ProxyPassReverse "/swfchart_jsp_samples/" "balancer://library-group/"
```

- Mengarahkan semua permintaan yang masuk ke balancer.
- Mengarahkan respons yang dikembalikan dari server backend kembali ke klien, memastikan bahwa URL yang dikembalikan
  dalam header Location atau Content-Location diubah dengan benar untuk mengarah ke server proxy.

# Setup Virtual Host Mod JK

## Load JK Module / Tomcat Connector

```text
LoadModule jk_module modules/mod_jk.so

# Specify path to worker configuration file
JkWorkersFile /opt/httpd/conf/workers.properties

# Configure logging and memory
JkShmFile logs/mod_jk.shm
JkLogFile logs/mod_jk.log
JkLogLevel debug
```

## Worker Configuration

```properties
#Name of the worker
worker.list = library-group, jkstatus

#Slave 1 configuration
worker.slave1.type = ajp13
worker.slave1.host = 192.168.56.2
worker.slave1.port = 8009
worker.slave1.lbfactor = 10

#Slave 2 configuration
worker.slave2.type = ajp13
worker.slave2.host = 192.168.1.8
worker.slave2.port = 8009
worker.slave2.lbfactor = 10

#LB method and stick session and the member details
worker.library-group.type = lb
worker.library-group.sticky_session = true
#worker.library-group.sticky_session_force = true
worker.library-group.balance_workers = slave1, slave2
#worker.loadbalancer.method=B

# Define a 'jkstatus' worker using status
worker.jkstatus.type=status
```

## Register path into to Proxy Balancer

```text
<VirtualHost *:5680>
    ServerAdmin example@library.com
    DocumentRoot "/opt/content/library/"
    DirectoryIndex index.html
    ServerName www.library.com
    ServerAlias library.com
    ErrorLog "logs/library.com-error_log"
    CustomLog "logs/library.com-access_log" combined

    # This for JK Mount
    JkMount /swfchart_jsp_samples/* library-group
    JkMount /jkmanager/* jkstatus
</VirtualHost>
```
