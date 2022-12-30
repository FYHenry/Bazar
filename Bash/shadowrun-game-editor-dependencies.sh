#!/usr/bin/bash

########################
# By Alnotz            #
# Licence : GNU GPL v3+#
########################

# To resolve library dependencies in the editor of the Shadowrun trilogy.

# Help
if [[ "$1" = "--help" || "$1" = "-h" ]]
then
  echo -e "Usage :"
  echo -e "${0} (-h|--help)"
  echo -e "${0} (-s|--suffix) DIR [DIR ...] "
  exit 0
fi

# SR Directories
if [[ "$1" = "--suffix" || "$1" = "-s" ]]
then
  shift 1
  if [ -z "$1" ]
  then
    echo "Use the options '-s' or '--suffix' to add Shadowrun directories"
    echo -e "Example : ${0} -s /home/first/SRGame /home/second\ game\ dir"
    exit 2
  fi
  declare -ra SR_HOME_LIST=("$@")
else
  echo "Need '--help' ?"
  exit 0
fi
echo -e '\x1b[1;32mShadowrun directories :\x1b[0m'
echo
for i in "${SR_HOME_LIST[@]}"
do
  echo -e "\x1b[1;32m$i\x1b[0m"
done
echo

mkdir -v /tmp/SR_tmp || exit 3
declare -r ORIGIN="${PWD}"
cd /tmp/SR_tmp || exit 4

# DEB Downloads
for dlwd in "https://security.debian.org/debian-security/pool/updates/main/q/qt4-x11/qt4-qtconfig_4.8.7+dfsg-11+deb9u3_i386.deb" \
  "https://security.debian.org/debian-security/pool/updates/main/q/qt4-x11/libqtcore4_4.8.6+git64-g5dc8b2b+dfsg-3+deb8u2_i386.deb" \
  "https://security.debian.org/debian-security/pool/updates/main/q/qt4-x11/libqtgui4_4.8.6+git64-g5dc8b2b+dfsg-3+deb8u2_i386.deb" \
  "https://security.debian.org/debian-security/pool/updates/main/q/qt4-x11/libqt4-network_4.8.6+git64-g5dc8b2b+dfsg-3+deb8u2_i386.deb" \
  "https://ftp.debian.org/debian/pool/main/n/nas/libaudio2_1.9.4-3_i386.deb" \
  "https://ftp.debian.org/debian/pool/main/libs/libsm/libsm6_1.2.3-1_i386.deb" \
  "https://ftp.debian.org/debian/pool/main/libx/libxt/libxt6_1.1.5-1+b3_i386.deb" \
  "https://ftp.debian.org/debian/pool/main/libx/libxt/libxt6_1.1.5-1+b3_i386.deb" \
  "https://ftp.debian.org/debian/pool/main/z/zlib/zlib1g_1.2.11.dfsg-1+deb10u1_i386.deb" \
  "https://security.debian.org/debian-security/pool/updates/main/libp/libpng/libpng12-0_1.2.50-2+deb8u2_i386.deb" \
  "https://security.debian.org/debian-security/pool/updates/main/libi/libice/libice6_1.0.9-1+deb8u1_i386.deb"
do
  wget -- "${dlwd}"
done

# DEB unpackagings
mkdir -v tmplib
for pkg in *.deb
do
  ar xv "${pkg}" data.tar.xz --output ./tmplib/
  tar xvf ./tmplib/data.tar.xz -C ./tmplib
  rm -f ./tmplib/data.tar.xz
done
cp -rfv ./tmplib/usr/lib/i386-linux-gnu/* ./tmplib/
cp -rfv ./tmplib/lib/i386-linux-gnu/* ./tmplib/
rm -rfv ./tmplib/usr
rm -rfv ./tmplib/lib

# Libraries in SR directories
for sr_home in "${SR_HOME_LIST[@]}"
do
  if [ ! -d "${sr_home}"/lib ]
  then
    mkdir -v "${sr_home}"/lib
  fi
  cp -rv ./tmplib/* "${sr_home}"/lib/
done

# End
cd "${ORIGIN}" || cd
rm -rfv /tmp/SR_tmp
