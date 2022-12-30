#!/usr/bin/env bash
#Migration selon Freedesktop.org
cd || exit 1
if [ ! -d .local/share/GIMP/2.10/ ]
then
  mkdir -v -p .local/share/GIMP/2.10/
fi
for GIMP_DIR in brushes dynamics patterns palettes gradients fonts tool-presets scripts themes icons fractalexplorer gfig gflare gimpressionist 
do
  if [ -d .config/GIMP/2.10/${GIMP_DIR} ]
  then
    mv -v .config/GIMP/2.10/${GIMP_DIR}/ .local/share/GIMP/2.10/${GIMP_DIR}
  else
    mkdir -v -p .local/share/GIMP/2.10/${GIMP_DIR}
  fi
done
if [ ! -d .local/lib/GIMP/2.10/ ]
then
  mkdir -v -p .local/lib/GIMP/2.10/
fi
for GIMP_DIR in plug-ins modules interpreters environ
do
  if [ -d .config/GIMP/2.10/${GIMP_DIR} ]
  then
    mv -v .config/GIMP/2.10/${GIMP_DIR}/ .local/lib/GIMP/2.10/${GIMP_DIR}
  else
    mkdir -v -p .local/lib/GIMP/2.10/${GIMP_DIR}
  fi
done

