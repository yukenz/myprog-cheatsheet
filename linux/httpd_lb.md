# Setup Virtual Host Mod Proxy

## Virtual Host Listen

```properties
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

```properties
<Directory "/opt/content/library/">
   Options Indexes FollowSymlinks
   AllowOverride None
   Require  all granted
</Directory>
```

## Add Balance Manager WebInterface

```properties
<Location "/balancer-manager">
    SetHandler balancer-manager
    Require all granted
</Location>
```

## Add Header

```properties
Header add Set-Cookie "ROUTEID=.%{BALANCER_WORKER_ROUTE}e; path=/" env=BALANCER_ROUTE_CHANGED
```

- Cookie ini digunakan untuk memastikan bahwa permintaan selanjutnya dari klien yang sama akan diarahkan ke worker yang
  sama.
- Cookie hanya ditambahkan jika lingkungan BALANCER_ROUTE_CHANGED ada, yang terjadi jika route worker berubah.

## Create Proxy balancer and add member

```properties
<proxy balancer://library-group>
    BalancerMember http://192.168.56.2:8080/swfchart_jsp_samples/ route=slave1
    BalancerMember http://192.168.1.8:8080/swfchart_jsp_samples/ route=slave2
    ProxySet stickysession=ROUTEID
    ProxySet lbmethod=byrequests
</proxy>
```

## Register path into to Proxy Balancer

```properties
ProxyPass "/swfchart_jsp_samples/" "balancer://library-group/"  stickysession=JSESSIONID|jsessionid sc>
ProxyPassReverse "/swfchart_jsp_samples/" "balancer://library-group/"
```

- Mengarahkan semua permintaan yang masuk ke balancer.
- Mengarahkan respons yang dikembalikan dari server backend kembali ke klien, memastikan bahwa URL yang dikembalikan
  dalam header Location atau Content-Location diubah dengan benar untuk mengarah ke server proxy.

# Setup Virtual Host Mod JK

## Load JK Module / Tomcat Connector

```properties
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
worker.list=library-group, jkstatus
#Slave 1 configuration
worker.slave1.type=ajp13
worker.slave1.host=192.168.56.2
worker.slave1.port=8009
worker.slave1.lbfactor=10
#Slave 2 configuration
worker.slave2.type=ajp13
worker.slave2.host=192.168.1.8
worker.slave2.port=8009
worker.slave2.lbfactor=10
#LB method and stick session and the member details
worker.library-group.type=lb
worker.library-group.sticky_session=true
#worker.library-group.sticky_session_force = true
worker.library-group.balance_workers=slave1, slave2
#worker.loadbalancer.method=B
# Define a 'jkstatus' worker using status
worker.jkstatus.type=status
```

## Register path into to Proxy Balancer

```properties
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

# Setup Virtual Host Mod Cluster

## Set Up Domain XML Master proxy
```xml

<profile name="full-ha">
  ...
  <proxy name="default"
         advertise-security-key="secret"
         proxies="modcluster-outbound-proxy"
         advertise-socket="modcluster"
         listener="ajp">
    ...
  </proxy>
  ...
</profile>
```
## Set Up Domain XML Master outbound-socket-binding
```xml

<socket-binding-group name="full-ha-sockets" default-interface="public">
    ...
    <outbound-socket-binding name="modcluster-outbound-proxy">
        <remote-destination host="192.168.148.130" port="6666"/>
    </outbound-socket-binding>
    ...
</socket-binding-group>
```

## Load Main Module
```properties
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_connect_module modules/mod_proxy_connect.so
LoadModule proxy_ftp_module modules/mod_proxy_ftp.so
LoadModule proxy_http_module modules/mod_proxy_http.so
#LoadModule proxy_fcgi_module modules/mod_proxy_fcgi.so
#LoadModule proxy_scgi_module modules/mod_proxy_scgi.so
#LoadModule proxy_uwsgi_module modules/mod_proxy_uwsgi.so
#LoadModule proxy_fdpass_module modules/mod_proxy_fdpass.so
#LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so
LoadModule proxy_ajp_module modules/mod_proxy_ajp.so
#LoadModule proxy_balancer_module modules/mod_proxy_balancer.so
#LoadModule proxy_express_module modules/mod_proxy_express.so
#LoadModule proxy_hcheck_module modules/mod_proxy_hcheck.so
#LoadModule session_module modules/mod_session.so
#LoadModule session_cookie_module modules/mod_session_cookie.so
#LoadModule session_crypto_module modules/mod_session_crypto.so
#LoadModule session_dbd_module modules/mod_session_dbd.so
LoadModule slotmem_shm_module modules/mod_slotmem_shm.so
```

## Load Module

```properties
LoadModule proxy_cluster_module modules/mod_proxy_cluster.so
LoadModule cluster_slotmem_module modules/mod_cluster_slotmem.so
LoadModule manager_module modules/mod_manager.so
LoadModule advertise_module modules/mod_advertise.so

Listen *:6666

MemManagerFile "/opt/httpd/cache/mod_cluster"
```

## Register manager module

```properties
<IfModule manager_module>
    ManagerBalancerName library-group

    <VirtualHost *:6666>
    KeepAliveTimeout 300
    MaxKeepAliveRequests 0
    ServerAdvertise on
    AdvertiseFrequency 5
    AdvertiseSecurityKey secret
    AdvertiseGroup 224.0.1.105:23364
    EnableMCPMReceive
    ErrorLog logs/manager.com-error_log
    CustomLog logs/manager.com-access_log common
    <Location /mc>
      SetHandler mod_cluster-manager
      # Require ip 127.0.0.1 ::1
    </Location>

    <Directory />
      Require all granted
    </Directory>

     </VirtualHost>
</IfModule>
```

## Register Virtual Host

```properties
  <VirtualHost *:5680>
  KeepAliveTimeout 60
  MaxKeepAliveRequests 0
  ServerAdmin library@library.com
  DocumentRoot /opt/content/library/
  ServerName www.library.com
  ServerAlias library.com
  ErrorLog logs/library.com-error_log
  CustomLog logs/library.com-access_log common
    ProxyPass /swfchart_jsp_samples/* balancer://library-group stickysession=JSESSIONID|jsessionid nofailover=On
    ProxyPassReverse /swfchart_jsp_samples/* balancer://library-group
    ProxyPreserveHost On
  </VirtualHost>
```

## Allow Access Root Dir VHOST

```properties
<Directory /opt/content/library>
    Options FollowSymLinks
    AllowOverride None
    FileETag All -INode
    Require all granted
</Directory>
```