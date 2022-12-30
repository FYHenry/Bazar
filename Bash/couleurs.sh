#!/usr/bin/env bash
# Pour faire du formattage en couleur.
# On effectue des commandes comme
#+« CODE=$( echo -e "\E[$( echo $EFFET )  ;$( echo $CHAR );$( echo $FONT )m TEXT \E[0m"   ) ; echo $CODE ; »
#+echo -e -n $( printf '\\E[%1d;3%1d;4%1dm%s\\E[0m' $EFFECT $CHAR $FONT "$TEXT" )
#+ou « CODE=$( echo -e "\033[$( echo $EFFET );$( echo $CHAR );$( echo $FONT )m TEXT \033[0m" ) ; echo $CODE ; ».
# Codes de couleur pour CHAR et FONT.
# NOIR=0
# ROUGE=1
# VERT=2
# JAUNE=3
# BLEU=4
# MAGENTA=5
# CYAN=6
# BLANC=7
# Codes supplémentaires pour EFFECT.
# SIMPLE=0
# GRAS=1
# INACTIF=2
# ITALIQUE=3
# SOUSLIGNE=4
# CLIGNOTANT=5
# INVERSE=6
# INVISIBLE=7
# BARRE=8
# Case à tester : case $BIDULE in 0) MOT=0 ;; 1) MOT=1 ;; 2) MOT=2 ;; 3) MOT=3 ;; *) MOT=rien ;; esac ; echo $MOT ;

# On veut intégrer 3 options :
#+* Couleur de caractère "--char";
#+* Couleur de font "--font";
#+* Format de texte "--effect".
# Au moins un argument : le texte.
# Pas d'argument --> info des commandes.

# Fonction pour les choix des couleurs.
function choixCouleur()
{
  case $1 in 
    (0|noir)
      declare -r -i COULEUR=0
      ;;
    (1|rouge)
      declare -r -i COULEUR=1
      ;;
    (2|vert)
      declare -r -i COULEUR=2
      ;;
    (3|jaune)
      declare -r -i COULEUR=3
      ;;
    (4|bleu)
      declare -r -i COULEUR=4
            ;;
    (5|magenta)
      declare -r -i COULEUR=5
      ;;
    (6|cyan)
      declare -r -i COULEUR=6
      ;;
    (7|blanc)
      declare -r -i COULEUR=7
      ;;
    (*)
      declare -r -i COULEUR=7
      ;;
  esac
  echo $COULEUR
}

# Fonction pour les choix de forme.
function choixForme()
{
  case $1 in
  (0|simple)
    declare -r -i COULEUR=0
    ;;
  (1|gras)
    declare -r -i COULEUR=1
    ;;
  (2|inactif)
    declare -r -i COULEUR=2
    ;;
  (3|italique)
    declare -r -i COULEUR=3
    ;;
  (4|sousligne)
    declare -r -i COULEUR=4
    ;;
  (5|clignotant)
    declare -r -i COULEUR=5
    ;;
  (6|inverse)
    declare -r -i COULEUR=7
    ;;
  (7|invisible)
    declare -r -i COULEUR=8
    ;;
  (8|barre)
    declare -r -i COULEUR=9
    ;;
  (*)
    declare -r -i COULEUR=0
    ;;
  esac
  echo $COULEUR
}
# Sans argument, le texte d'aide.
function hlp()
{
  echo "Commande pour formater facilement un texte."
  echo -e "Usage : $0 [-h|--text]"
  echo -e "Usage : $0 [-c|--char CHAR] [-f|--font FONT] [--effect EFFECT] [--] (-|TEXT)"
  echo
  echo "--char CHAR"
  echo "    Colorie les caractères du texte TEXT."
  echo ""
  echo "--font FONT"
  echo "    Colorie le font du texte TEXT."
  echo ""
  echo "--effect EFFECT"
  echo "    Formate les caractères du texte TEXT."
  echo
  echo "TEXT : une chaîne de caractères brutes."
  echo -e "    Possibilité de passer par l’entré standard via \"-\"."
  echo
  echo "CHAR et FONT :"
  echo "    0- noir"
  echo "    1- rouge"
  echo "    2- vert"
  echo "    3- jaune"
  echo "    4- bleu"
  echo "    5- magenta"
  echo "    6- cyan"
  echo "    7- blanc"
  echo
  echo "EFFECT :"
  echo "    0- simple"
  echo "    1- gras"
  echo "    2- inactif"
  echo "    3- italique"
  echo "    4- souligne"
  echo "    5- clignotant"
  echo "    6- inverse"
  echo "    7- invisible"
  echo "    8- barre"
  echo
  echo "Script fait avec amour. ;-)"
}
# Pas d’argument? Vers l’aide.
if [ -z "$1" ]
then
  hlp
  exit 0
fi
# Paramètres par défaut
# Simple blanc sur noir
declare -i CHAR=7
declare -i FONT=0
declare -i EFFECT=0
declare TEXT=' '
# Contrôle des entrées.
while [[ $# -gt 0 ]]
do
  case $1 in
  (-h|--help)
    hlp
    exit 0
    ;;
  (-c|--char)
    CHAR=$(choixCouleur "$2")
    shift 2
    ;;
  (-f|--font)
    FONT=$(choixCouleur "$2")
    shift 2
    ;;
  (-e|--effect)
    EFFECT=$(choixForme "$2")
    shift 2
    ;;
  # Dernière entrée.
  (--)
    if [ -n "$2" ]
    then
      if [ "$2" = "-" ]
      then
        TEXT="$(< /dev/stdin)"
      else
        TEXT="$2"
      fi
      shift 2
    else
      shift 1
    fi
    break
    ;;
  # stdin.
  (-)
    TEXT="$(< /dev/stdin)"
    shift 1
    break
    ;;
  # Texte par défaut.
  (*)
    TEXT="$1"
    shift 1
    break
    ;;
  esac
done
# Finalement, on récupère les trois options et le texte.
echo "printf '\E[%1d;3%1d;4%1dm%s\E[0m\n' ${EFFECT} ${CHAR} ${FONT} '${TEXT}'" | bash
