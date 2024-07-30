# Add LVM Partition

## lvs

Display information about logical volumes

```text
LV   VG     Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert

home centos -wi-ao---- <18.37g                                                    
root centos -wi-ao---- 275.62g                                                    
swap centos -wi-ao----   3.00g
```

## fdisk

To Create LVM Partition

```shell
fdisk /dev/sdb
```

To see partition

```shell
fdisk -l /dev/sdb
```
Result :
```text
Disk /dev/sdb: 118.1 GB, 118111600640 bytes, 230686720 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x06b00872

Device Boot             Start         End      Blocks     Id     System
/dev/sdb1                2048    230686719    115342336   8e  Linux LVM
```

## partprobe

Inform the OS of partition table changes

## pvcreate

Initialize physical volume(s) for use by LVM

```shell
pvcreate /dev/sdb1
```

## pvs
Display information about physical volumes
```text
  PV         VG     Fmt  Attr PSize    PFree
  /dev/sda2  centos lvm2 a--   <59.00g    0 
  /dev/sdb1  centos lvm2 a--  <110.00g 1.99g
  /dev/sdc   centos lvm2 a--   <30.00g    0 
  /dev/sdd   centos lvm2 a--  <100.00g    0
```

## vgs

Display information about volume groups
```text
  VG     #PV #LV #SN Attr   VSize   VFree
  centos   4   3   0 wz--n- 298.98g 1.99g
```

## vgextend

Add physical volumes to a volume group

```shell
vgextend centos /dev/sdb1
```

## lvextend

Add space to a logical volume

```shell
lvextend /dev/mapper/centos-root -L +109G -r
```

-L : Specifies the new size of the LV. \
-r : Resize underlying filesystem together with the LV using fsadm(8)
