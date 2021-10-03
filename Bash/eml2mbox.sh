#!/bin/env bash
#Convertir une pile de courriels EML en répertoire MBOX pour Thunderbird.
if [[ $1 == '--help' ]]
then
  echo -e "Syntaxe : $0 ( --help | --c FICHIERS CIBLE )"
elif [[ $1 == '-c' ]]
then
  shift 1
  if ! [ -w '$2' ] #Si le fichier n'existe pas ou ne peut pas être écrit
  then
    touch ./$2 #Répertoire cible.
    echo -e "$2 créé."
  fi
  NBR=0
  for FICHIER in $1
  do
    echo -e "n°$NBR : $FICHIER" #Fichiers EML à concaténer.
    echo -e "From - $(LANG='en_US' date +'%a %b %d %H:%M:%S %Y')" >> ./$2 # Date.
    cat "$FICHIER" >> ./$2 #Concaténation du fichier.
    echo -e "$FICHIER => $2"
    NBR=$((NBR + 1))
  done
  echo -e "Appending in $2 is done."
fi
