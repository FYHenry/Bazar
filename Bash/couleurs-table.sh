#!/usr/bin/env bash
##===================##
##Auteur : Alnotz    ##
##Date : 09/02/2019  ##
##===================##
#Un argument ? Ca fera office d'exemple.
if [ -z "$1" ] ;
then
  #Texte par defaut.
  echo -e "Usage: $0 TEXT"
  echo
  echo "TEXT: texte à colorer en tableaux."
  exit 0
else
  declare -r TEXT="$1"
fi
#Effet de texte.
declare -i EFFECT=0
#Couleur de caractere.
declare -i CHAR=0
#Couleur de font.
declare -i FONT=0
#Tables de couleur par effet.
while [ "$EFFECT" -lt "10" ] ;
do
  echo -e "Effect=$EFFECT"
  echo
  echo -e "\tBack"
  echo -e "Char\t0\t1\t2\t3\t4\t5\t6\t7"
  #Colonnes des couleurs de texte.
  while [ "$CHAR" -lt "8" ] ;
  do
    echo -e -n "$CHAR\t"
    #Cellules des couleurs de font.
    while [ "$FONT" -lt "8" ] ;
    do
      #Partie delicate : format \E['';'';''m\E[0m.
      echo -e -n "$( printf '\\E[%1d;3%1d;4%1dm%s\\E[0m'\
        $EFFECT $CHAR $FONT "$TEXT" )"
      echo -e -n "\t"
      FONT=$(( FONT + 1 ))
    done
    echo -e -n "\n"
    FONT=0
    CHAR=$(( CHAR + 1 ))
  done
  echo -e -n "\n\n"
  CHAR=0 
  EFFECT=$(( EFFECT + 1 ))
done 
EFFECT=0
echo -e -n "\n\n\n"
exit 0
