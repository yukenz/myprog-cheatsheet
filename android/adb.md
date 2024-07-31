
## Process Management
```shell
# Kill by Package Name
am kill $PKG_NAME

# Kill process
ps -A | grep facebook
```


## Package Management
```shell
# List all installed Application
adb shell pm list packages -3
adb shell pm clear package
# Install
adb install apk
adb uninstall apk
```

## Backup Restore
```shell
# Backup
tar -C / -cvzvhf wa.tar.gz  /data/data/com.whatsapp/

# Extract

tar -C / -xvzvhf wa.tar.gz
```

## File Transfer
```shell

# Remote -> Local
adb pull

# Local -> Remote
adb push 
```

## Logcat
```shell
# Error Level
# E W D I
adb logcat id.bmri.livin:E id.bmri.livin:D id.bmri.livin:W id.bmri.livin:I *:S
adb logcat MyApp:E *:S

adb logcat | findstr "id.bmri.livin"
```

## Clipboard
```shell
adb shell input text "H"
```

## Whatsapp
u0_a214
u0_a214_cache

