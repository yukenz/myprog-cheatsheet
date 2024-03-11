# Add linux compatibility in FreeBSD

<!-- TOC -->
* [Add linux compatibility in FreeBSD](#add-linux-compatibility-in-freebsd)
  * [Enable compat](#enable-compat)
  * [Install base module](#install-base-module)
  * [Fix Boot](#fix-boot)
  * [Additional info after install base centos](#additional-info-after-install-base-centos)
<!-- TOC -->

## Enable compat

```shell
# Enable on boot
sysrc linux_enable="YES"
# Start linux service now
service linux start
# Make sure work
ls -l /compat/linux/
```

ls result akan jadi seperti ini :

```text
total 1
dr-xr-xr-x  13 root  wheel  512 Apr 11 19:12 dev
dr-xr-xr-x   1 root  wheel    0 Apr 11 21:03 proc
dr-xr-xr-x   1 root  wheel    0 Apr 11 21:03 sys
```

## Install base module

Hanya centos yang mudah digunakan, dibandingkan bootstrap debian/ubuntu

```shell
# Install base centos
pkg install linux_base-c7
# Make sure work
ls -l /compat/linux/
```

ls result akan jadi seperti ini :

```text
total 30
lrwxr-xr-x   1 root  wheel    7 Apr 11  2018 bin -> usr/bin
drwxr-xr-x  13 root  wheel  512 Apr 11 21:10 dev
drwxr-xr-x  25 root  wheel   64 Apr 11 21:10 etc
lrwxr-xr-x   1 root  wheel    7 Apr 11  2018 lib -> usr/lib
lrwxr-xr-x   1 root  wheel    9 Apr 11  2018 lib64 -> usr/lib64
drwxr-xr-x   2 root  wheel    2 Apr 11 21:10 opt
dr-xr-xr-x   1 root  wheel    0 Apr 11 21:25 proc
lrwxr-xr-x   1 root  wheel    8 Feb 18 02:10 run -> /var/run
lrwxr-xr-x   1 root  wheel    8 Apr 11  2018 sbin -> usr/sbin
drwxr-xr-x   2 root  wheel    2 Apr 11 21:10 srv
dr-xr-xr-x   1 root  wheel    0 Apr 11 21:25 sys
drwxr-xr-x   8 root  wheel    9 Apr 11 21:10 usr
drwxr-xr-x  16 root  wheel   17 Apr 11 21:10 var
```

## Fix Boot

Untuk boot agar lancar

```shell
# Disable /etc/rc.d/linux mount
sysrc linux_mounts_enable="NO"
```

Tambahkan konfigurasi berikut di **/etc/fstab**

```text
devfs      /compat/linux/dev      devfs      rw,late                    0  0
tmpfs      /compat/linux/dev/shm  tmpfs      rw,late,size=1g,mode=1777  0  0
fdescfs    /compat/linux/dev/fd   fdescfs    rw,late,linrdlnk           0  0
linprocfs  /compat/linux/proc     linprocfs  rw,late                    0  0
linsysfs   /compat/linux/sys      linsysfs   rw,late                    0  0
```

## Additional info after install base centos

```text
Some programs need linprocfs mounted on /compat/linux/proc.  Add the
following line to /etc/fstab:

linprocfs   /compat/linux/proc  linprocfs       rw      0       0

Then run "mount /compat/linux/proc".

Some programs need linsysfs mounted on /compat/linux/sys.  Add the
following line to /etc/fstab:

linsysfs    /compat/linux/sys   linsysfs        rw      0       0

Then run "mount /compat/linux/sys".

Some programs need tmpfs mounted on /compat/linux/dev/shm.  Add the
following line to /etc/fstab:

tmpfs    /compat/linux/dev/shm  tmpfs   rw,mode=1777    0       0

Then run "mount /compat/linux/dev/shm".
```

## SoftwareAG

```shell
-installDir /home/softwareag -readImage ./sag/installer/SoftwareAG1015-installer-linux-04042023.zip -console 
```