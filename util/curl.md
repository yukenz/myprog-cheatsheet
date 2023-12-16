# CURL Example Usage

```shell
curl curl -L \
--cookie ./Downloads/developer.apple.com_cookies.txt \
--output /Volumes/DATA/INSTALLER/Xcode_13.2.1.xip \
--continue-at - \
--parallel \
--tcp-nodelay \
https://download.developer.apple.com/Developer_Tools/Xcode_13.2.1/Xcode_13.2.1.xip
```

-L
: Mengikuti _Redirect_ jika diperlukan

--cookie
: Menggunakan cookie.txt

--output
: Mengatur output _filepath_

--continue-at -
: Melanjutkan dari download yang sebelumnya

--parallel
: Mencoba menerapkan _Threading_ download seperti IDM

--tcp-nodelay
: Memaksimalkan protokol TCP

