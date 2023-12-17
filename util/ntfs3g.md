# Install NTFS-3G MacOS for NTFS R/W

## Prepare Dependency
```shell
brew install macfuse autoconf automake libtool libgcrypt pkg-config e2fsprogs
# Allow all KEXT permissions
# Then Reboot
```

## Prepare Build
```shell
# Export GNU Bin
export PATH="/usr/local/opt/libtool/libexec/gnubin:$PATH"

# Build Section
./autogen.sh
LDFLAGS="-L/opt/homebrew/lib -lintl" ./configure --exec-prefix=/usr/local
make -j8 #8 is our thread

# Install Section
sudo make install
```

## U/Mount Command
```shell
sudo ntfs-3g -o auto_xattr /dev/disk0sX /Volumes/Windows
sudo umount /Volumes/Windows
```