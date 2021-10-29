#!/usr/bin/env bash
#Générateur de BEPO.svg
#Dotted Circle = &#x25cc;
DEST=./BEPO.svg
########################################################
#                                                      #
#  Bloc des données                                    #
########################################################
BASE=( '$' '"' « » '(' ')' '@' '+' '-' '/' '*' '=' % '&#9003;' \
       '&#8677;' b é p o è '&#770;&#x25cc;' v d l j z w '&#9094;' \
       '&#8683;' a u i e  ',' c t s r n m ç '&#9094;' \
       '&#8679;' ê à y x . k ’ q g h f '&#8679;' '&#8679;')
HBASE=('&#x2388;' '&#x2318;' '&#x2387;' '&#x21ee;' '&#x2318;' '&#x2325;' '&#x2388;')
SHIFT=('#' 1 2 3 4 5 6 7 8 9 0 ° '`' ' ' \
       '&#8676;' B É P O È '!' V D L J Z W '&#9166;' \
       ' ' A U I E ';' C T S R N M Ç '&#9166;' \
       ' ' Ê À Y X ':' K '?' Q G H F '&#8679;' '&#8679;')
ALTER=('&#x2013;' '&#x2014;' '&lt;' '&gt;' '[' ']' '^' ± '&#x002d;' ÷ × '&#x2260;' '&#x2030;' ' ' \
       ' ' '|' '&#x0301;&#x25cc;' '&amp;' œ '&#x0300;&#x25cc;' ¡ '&#x030c;&#x25cc;' '&#x2212;' '&#x00f8;' ü '&#x0336;&#x25cc;' ö '&#9094;' \
       ' ' æ ù '&#x0308;&#x25cc;' € \' '&#x0327;&#x25cc;' '&#x1d49;' ß '&#x0306;&#x25cc;' '&#x0303;&#x25cc;' '&#x0304;&#x25cc;' © '&#9094;' \
       ' ' '/' '\' '{' '}' … '~' ¿ '&#x030a;&#x25cc;' µ '&#x0323;&#x25cc;' '&#x0328;&#x25cc;' '&#8679;' '&#8679;')
ALTSH=('&#x00b6;' '&#x201e;' '&#x201c;' '&#x201d;' '&#x2264;' '&#x2265;' '&#x2016;' '&#x00ac;' '&#x00bc;' '&#x00bd;' '&#x00be;' '&#x2032;' '&#x2033;' ' ' \
       ' ' _ ’ § Œ '`' '^' '&#x02c7;' '&#x221d;' £ Ü '&#x0335;&#x25cc;' Ö '&#9166;' \
       ' ' Æ Ù '&#x0307;&#x25cc;' '&#x00a4;' '&#x0326;&#x25cc;' © ™ '&#x017f;' '&#x00ae;' '~' '-' '&#x1F12F;' '&#9166;' \
       ' ' '^' ','  ‘ ’ ⋅ '&#x2011;'  '&#x0313;&#x25cc;' '&#x0315;&#x25cc;' '&#x2020;' '&#x2021;' '&#x2022;' '&#8679;' '&#8679;')
########################################################
#                                                      #
#  Bloc de style                                       #
########################################################
echo '''<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg 
  xmlns:svg="http://www.w3.org/2000/svg" 
  xmlns="http://www.w3.org/2000/svg" 
  width="1680" 
  height="620" 
  viewBox="0 0 1680 620" 
  lang="fr">
  <title>Disposition BÉPO</title>
  <desc>Personalisation du clavier BÉPO avec la norme ISO/IEC 9995-7.</desc>
  <style>
    @media (prefers-color-scheme: light)
    {
      /*Style d’ensemble*/
      svg
      {
        background: #e1e1e1;
        color: #908f90;
      }
      /*Style de touche*/
      rect
      {
        fill: #fffcf7;
        stroke: #a09fa0;
      }
      /*Styles des caractères*/
      text
      {
        font-family: monospace;
        font-size: 40px;
      }
      text.base
      {
        fill: purple;
      }
      text.shift
      {
        fill: blue;
      }
      text.alt
      {
        fill: green;
      }
      text.combo
      {
        fill: orange;
      }
      text.dead
      {
        font-weight: bold;
      }
      image#cc_circle
      {
        height: 22px!important;
        margin-left: 3px;
        vertical-align: text-bottom;
      }
      image#cc_by
      {
        height: 22px!important;
        margin-left: 3px;
        vertical-align: text-bottom;
      }
    }
    @media (prefers-color-scheme: dark)
    {
      /*Style d’ensemble*/
      svg
      {
        background: #908f90;
        color: #e1e1e1;
      }
      /*Style de touche*/
      rect
      {
        fill: #a09fa0;
        stroke: #fffcf7;
      }
      /*Styles des caractères*/
      text
      {
        font-family: monospace;
        font-size: 40px;
      }
      text.base
      {
        fill: purple;
      }
      text.shift
      {
        fill: blue;
      }
      text.alt
      {
        fill: green;
      }
      text.combo
      {
        fill: orange;
      }
      text.dead
      {
        font-weight: bold;
      }
      image#cc_circle
      {
        height: 22px!important;
        margin-left: 3px;
        vertical-align: text-bottom;
      }
      image#cc_by
      {
        height: 22px!important;
        margin-left: 3px;
        vertical-align: text-bottom;
      }
    }
  </style>''' > $DEST
########################################################
#                                                      #
#  Bloc des touches                                    #
########################################################
## Lignes orthogonales de 0 à 3 ########################
for KL in {0..3}
do
  KY=$((10+$KL*120))
  for KC in {0..13}
  do
    KX=$((10+$KC*120))
    echo '  <g id="keyl'$KL'c'$KC'" transform="translate('$KX' '$KY')">' >> $DEST
    echo '    <rect x="0" y="0" width="100" height="100" rx="10"/>' >> $DEST
    echo '    <text class="base" x="10" y="90">'${BASE[$(($KC+14*$KL))]}'</text>' >> $DEST
    echo '    <text class="shift" x="10" y="45">'${SHIFT[$(($KC+14*$KL))]}'</text>' >> $DEST
    echo '    <text class="alt" x="50" y="90">'${ALTER[$(($KC+14*$KL))]}'</text>' >> $DEST
    echo '    <text class="combo" x="50" y="45">'${ALTSH[$(($KC+14*$KL))]}'</text>' >> $DEST
    echo '  </g>' >> $DEST
  done
done
## Ligne 4 sans espace #################################
KL=4
KY=$((10+$KL*120))
for KC in {0..2}
do
  KX=$((10+$KC*120))
  echo '  <g id="keyl'$KL'c'$KC'" transform="translate('$KX' '$KY')">' >> $DEST
  echo '    <rect x="0" y="0" width="100" height="100" rx="10"/>' >> $DEST
  echo '    <text class="base" x="10" y="90">'${HBASE[$(($KC))]}'</text>' >> $DEST
  echo '    <text class="shift" x="10" y="45"></text>' >> $DEST
  echo '    <text class="alt" x="50" y="90"></text>' >> $DEST
  echo '    <text class="combo" x="50" y="45"></text>' >> $DEST
  echo '  </g>' >> $DEST
done
for KC in {10..13}
do
  KX=$((10+$KC*120))
  echo '  <g id="keyl'$KL'c'$KC'" transform="translate('$KX' '$KY')">' >> $DEST
  echo '    <rect x="0" y="0" width="100" height="100" rx="10"/>' >> $DEST
  echo '    <text class="base" x="10" y="90">'${HBASE[$(($KC-7))]}'</text>' >> $DEST
  echo '    <text class="shift" x="10" y="45"></text>' >> $DEST
  echo '    <text class="alt" x="50" y="90"></text>' >> $DEST
  echo '    <text class="combo" x="50" y="45"></text>' >> $DEST
  echo '  </g>' >> $DEST
done
## Barre d’espace ######################################
KC=3
KX=$((10+$KC*120))
echo '  <g id="keyl'$KL'c'$KC'" transform="translate('$KX' '$KY')">' >> $DEST
echo '    <rect x="0" y="0" width="820" height="100" rx="10"/>' >> $DEST
echo '    <text class="base" x="10" y="80">&#x2423;</text>' >> $DEST
echo '    <text class="shift" x="10" y="35">&#x2336;</text>' >> $DEST
echo '    <text class="alt" x="770" y="80">_</text>' >> $DEST
echo '    <text class="combo" x="770" y="35">&#x237d;</text>' >> $DEST
echo '  </g>' >> $DEST
## Touche Entrée à droite ##############################
KL=1
KY=$((10+$KL*120))
KC=13
KX=$((10+$KC*120))
echo '  <g id="keyl'$KL'c'$KC'" transform="translate('$KX' '$KY')">' >> $DEST
echo '    <rect x="0" y="0" width="100" height="220" rx="10"/>' >> $DEST
echo '    <text class="base" x="10" y="190">&#9094;</text>' >> $DEST
echo '    <text class="shift" x="10" y="45">&#9166;</text>' >> $DEST
echo '    <text class="alt" x="50" y="190"></text>' >> $DEST
echo '    <text class="combo" x="50" y="45"></text>' >> $DEST
echo '  </g>' >> $DEST
## Touche Capital à droite #############################
KL=3
KY=$((10+$KL*120))
KC=12
KX=$((10+$KC*120))
echo '  <g id="keyl'$KL'c'$KC'" transform="translate('$KX' '$KY')">' >> $DEST
echo '    <rect x="0" y="0" width="220" height="100" rx="10"/>' >> $DEST
echo '    <text class="base" x="10" y="90">&#8679;</text>' >> $DEST
echo '    <text class="shift" x="10" y="45"></text>' >> $DEST
echo '    <text class="alt" x="150" y="90"></text>' >> $DEST
echo '    <text class="combo" x="150" y="45"></text>' >> $DEST
echo '  </g>' >> $DEST
## Signature ###########################################
echo '''  <g xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/" transform="translate(50 610)">
    <text style="color: black; font-size: 1em; font-family: sans;">
      <a property="dct:title" rel="cc:attributionURL" href="https://www.alnotz.fr/">BÉPO Orthogonal avec ISO/IEC 9995-7</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.alnotz.fr/">Alnotz</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>
    </text>
    <a href="https://creativecommons.org/publicdomain/zero/1.0?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">
      <image x="48em" y="-1em" id="cc_circle" href="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"/>
      <image x="calc(48em + 22px)" y="-1em" id="cc_by" href="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"/>
    </a>
  </g>''' >> $DEST
echo '</svg>' >> $DEST
