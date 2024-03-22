# Oracle 21 XE CheatSheet

## Tools
Gunakan sqlplus

## Term
### C Model
CDB$ROOT(sys) -> XEPDB1 (pdbadmin)

### SID vs Service Name
- SID -> XE | Container
- Service Name -> XEPDB1 | Plugable
- user dan password menyesuakan jenisnya

### Grants
- connect
- resource
- dba
- unlimited [tablespace]
- create [view, sequence, trigger]
- all privileges

## Utils

### JDBC URL WM
```text
jdbc:wm:oracle://localhost:1521;serviceName=XEPDB1
```

### Create Docker C
```shell
docker create \
--tty --interactive \
--name oracledb \
--publish 1521:1521 \
--publish 5500:5500 \
--publish 8081:8080 \
--env ORACLE_PWD=admin \
--env ORACLE_CHARACTERSET=AL32UTF8 \
container-registry.oracle.com/database/express
```

### Clear Screen
```oraclesqlplus
clear scr
```
### Exit
Just do :
```oraclesqlplus
exit
```

# Show Pluggable DB List
```sql
select name from v$pdbs;
```

## Login sysdba
user : connect as sysdba
password : awan
SID : XE

## Check con_name
```oraclesqlplus
show con_name;
```
Conn terbagi 2 yaitu: 
1. Container (XE) 
2. Pluggable(XEPDB1)

## List ContainerDB and PluggableDB
```oraclesqlplus
-- Container 
select name from v$database;
-- Pluggable
select name from v$pdbs;
-- Parameter
select VALUE from v$parameter;

```

## Custom Connect
```oraclesqlplus
-- As sysdba
connect pdbadmin/admin123@localhost:1521/XEPDB1 as sysdba;
-- As normal
connect sagadmin/admin123@localhost:1521/XEPDB1;
```

## Turn IN/OUT Container
```oraclesqlplus
alter session set container=XEPDB1;
alter session set container=CDB$ROOT;
```
Coba Check con_name



## User Creation
```oraclesqlplus
create user sagadmin identified by sag123;
create user system identified by sys123;
drop user sagadmin cascade;
```
Notes 
- Pastikan cek con_name terlebih dahulu
- jika CDB$ROOT maka pembuatan user harus menggunakan C##
- Jika Pluggable tidak perlu

## List User
```sql
select * from all_users;
```
Notes
- Pastikan cek con_name terlebih dahulu
- Container atau Pluggable

## Access grants
```oraclesqlplus
grant all privileges to sagadmin;
grant dba to sagadmin;
revoke dba from sagadmin;

ALTER USER system IDENTIFIED BY admin ACCOUNT UNLOCK;

```

## Table NS
Path untuk TNS ada di : **/opt/oracle/oradata**

