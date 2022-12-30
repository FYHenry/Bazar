/**********************************|
| Code pour interagir avec Pentis. |
|**********************************/
console.log("Début.");
/* Pour contrôler la visibilité de la grille. */
/* Texte interactif. */
var iciTexte = document.getElementById("iciTexte");
/* Lien hypertexte pour masquer la grille. */
var ici = document.getElementById("ici");
/* Cadre de la grille. */
var cadreGrille = document.getElementById("grille");
var grilleCachee = true;//Besoin de préciser ?
function alterner(evt)
{
  if(grilleCachee)//Si caché.
  {
    cadreGrille.style.display = "block";
    iciTexte.innerText = "masquera la grille";
    grilleCachee = false;
  }
  else//Si visible.
  {
    cadreGrille.style.display = "none";
    iciTexte.innerText = "affichera la grille";
    grilleCachee = true;
  }
}
/* Écoute des clics sur l'hypertexte "ici". */
ici.addEventListener("click", alterner);
/******************************************************************************/
/* Début du tableau principal appelé la grille. */
var grille = [];//Tableau principal vide.
const NB_L = 24;//Total de ligne.
const NB_C = 40;//Total de colonnes.
for(let l=0; l<NB_L; l=l+1)//Remplissage.
{
  grille[l] = [];
  for(let c=0; c<NB_C; c=c+1)
  {
    grille[l][c] = 0;
  }
}
console.log(`Taille: ${grille.length} lignes et ${grille[0].length} colonnes.`);
function tblEcrire(tbl=grille)//Écrire le tableau principal en texte.
{
  const LIGNES = tbl.length;
  const COLONNES = tbl[0].length;
  document.querySelector("#tableau").innerText = "";
  for(let l=0; l<LIGNES; l=l+1)
  {
    document.querySelector("#tableau").innerText += "\n";
    for(let c=0; c<COLONNES; c=c+1)
    {
      if(tbl[l][c] <= 9)//Pour un nombre duodécimal.
      {
        /* Si un nombre à un chiffre. */
        document.querySelector("#tableau").innerText += `${tbl[l][c]}`;
      }
      else
      {
        let nmb = '';
        /* Si un nombre à plusieurs chiffres. */
        switch (tbl[l][c])
        {
          case 10:
          nmb = 'A';
          break;
          case 11:
          nmb = 'B';
          break;
          case 12:
          nmb = 'C';
          break;
          default:
          nmb = 'Z';
        }
        document.querySelector("#tableau").innerText += nmb;
      }
    }
  }
}
function tblExtraire(l1,c1,l2,c2,tbl)//Extraction d'une sous-matrice.
{
  const LIGNES = l2-l1;
  const COLONNES = c2-c1;
  let bloc = [];
  for(let l=0; l<LIGNES; l=l+1)
  {
    bloc[l] = [];
    for(let c=0; c<COLONNES; c=c+1)
    {
      bloc[l][c] = tbl[l][c];
    }
  }
  return bloc;
}
/******************************************************************************/
/* Création d'un nouveau bloc. */
function nvPentomino(no=0,l=0,c=0,tbl=grille)
{
  switch (no)
  {
    case 0 ://Vide.
    break;
    case 1 ://Bloc I 1-1
    tbl[l  ].splice(c,1,1);//*
    tbl[l+1].splice(c,1,1);//*
    tbl[l+2].splice(c,1,1);//*
    tbl[l+3].splice(c,1,1);//*
    tbl[l+4].splice(c,1,1);//*
    break;
    case 2 ://Bloc I 2-1
    tbl[l  ].splice(c,5,1,1,1,1,1);//*****
                                   //
                                   //
                                   //
                                   //
    break;
    case 3 ://Bloc Y 1-1
    tbl[l  ].splice(c,1,2);  //*
    tbl[l+1].splice(c,2,2,2);//**
    tbl[l+2].splice(c,1,2);  //*
    tbl[l+3].splice(c,1,2);  //*
                             //
    break;
    case 4 ://Bloc Y 1-2
    tbl[l  ].splice(c+1,1,2);    // *
    tbl[l+1].splice(c,4,2,2,2,2);//****
                                 //
                                 //
                                 //
    break;
    case 5 ://Bloc Y 1-3
    tbl[l  ].splice(c+1,1,2);// *
    tbl[l+1].splice(c+1,1,2);// *
    tbl[l+2].splice(c,2,2,2);//**
    tbl[l+3].splice(c+1,1,2);// *
                             //
    break;
    case 6 ://Bloc Y 1-4
    tbl[l  ].splice(c,4,2,2,2,2);//****
    tbl[l+1].splice(c+2,1,2);    //  *
                                 //
                                 //
                                 //
    break;
    case 7 ://Bloc Y 2-1
    tbl[l  ].splice(c+1,1,2);// *
    tbl[l+1].splice(c,2,2,2);//**
    tbl[l+2].splice(c+1,1,2);// *
    tbl[l+3].splice(c+1,1,2);// *
                             //
    break;
    case 8 ://Bloc Y 2-2
    tbl[l  ].splice(c,4,2,2,2,2);//****
    tbl[l+1].splice(c+1,1,2);    // *
                                 //
                                 //
                                 //
    break;
    case 9 ://Bloc Y 2-3
    tbl[l  ].splice(c,1,2);  //*
    tbl[l+1].splice(c,1,2);  //*
    tbl[l+2].splice(c,2,2,2);//**
    tbl[l+3].splice(c,1,2);  //*
                             //
    break;
    case 10://Bloc Y 2-4
    tbl[l  ].splice(c+2,1,2);    //  *
    tbl[l+1].splice(c,4,2,2,2,2);//****
                                 //
                                 //
                                 //
    break;
    case 11://Bloc Q 1-1
    tbl[l  ].splice(c,4,3,3,3,3);//****
    tbl[l+1].splice(c+3,1,3);    //   *
                                 //
                                 //
                                 //
    break;
    case 12://Bloc Q 1-2
    tbl[l  ].splice(c,2,3,3);//**
    tbl[l+1].splice(c,1,3);  //*
    tbl[l+2].splice(c,1,3);  //*
    tbl[l+3].splice(c,1,3);  //*
                             //
    break;
    case 13://Bloc Q 1-3
    tbl[l  ].splice(c,1,3);      //*
    tbl[l+1].splice(c,4,3,3,3,3);//****
                                 //
                                 //
                                 //
    break;
    case 14://Bloc Q 1-4
    tbl[l  ].splice(c+1,1,3);// *
    tbl[l+1].splice(c+1,1,3);// *
    tbl[l+2].splice(c+1,1,3);// *
    tbl[l+3].splice(c,2,3,3);//**
                             //
    break;
    case 15://Bloc Q 2-1
    tbl[l  ].splice(c,4,3,3,3,3);//****
    tbl[l+1].splice(c,1,3);      //*
                                 //
                                 //
                                 //
    break;
    case 16://Bloc Q 2-2
    tbl[l  ].splice(c,1,3);  //*
    tbl[l+1].splice(c,1,3);  //*
    tbl[l+2].splice(c,1,3);  //*
    tbl[l+3].splice(c,2,3,3);//**
                             //
    break;
    case 17://Bloc Q 2-3
    tbl[l  ].splice(c+3,1,3);    //   *
    tbl[l+1].splice(c,4,3,3,3,3);//****
                                 //
                                 //
                                 //
    break;
    case 18://Bloc Q 2-4
    tbl[l  ].splice(c,2,3,3);//**
    tbl[l+1].splice(c+1,1,3);// *
    tbl[l+2].splice(c+1,1,3);// *
    tbl[l+3].splice(c+1,1,3);// *
                             //
    break;
    case 19://Bloc P 1-1
    tbl[l  ].splice(c,3,4,4,4);//***
    tbl[l+1].splice(c+1,2,4,4);// **
                               //
                               //
                               //
    break;
    case 20://Bloc P 1-2
    tbl[l  ].splice(c,2,4,4);//**
    tbl[l+1].splice(c,2,4,4);//**
    tbl[l+2].splice(c,1,4);  //*
                             //
                             //
    break;
    case 21://Bloc P 1-3
    tbl[l  ].splice(c,2,4,4);   //**
    tbl[l+1].splice(c,3,4,4,4); //***
                                //
                                //
                                //
    break;
    case 22://Bloc P 1-4
    tbl[l  ].splice(c+1,1,4);// *
    tbl[l+1].splice(c,2,4,4);//**
    tbl[l+2].splice(c,2,4,4);//**
                             //
                             //
    break;
    case 23://Bloc P 2-1
    tbl[l  ].splice(c,3,4,4,4);//***
    tbl[l+1].splice(c,2,4,4);  //**
                               //
                               //
                               //
    break;
    case 24://Bloc P 2-2
    tbl[l  ].splice(c,1,4);  //*
    tbl[l+1].splice(c,2,4,4);//**
    tbl[l+2].splice(c,2,4,4);//**
                             //
                             //
    break;
    case 25://Bloc P 2-3
    tbl[l  ].splice(c+1,2,4,4);// **
    tbl[l+1].splice(c,3,4,4,4);//***
                               //
                               //
                               //
    break;
    case 26://Bloc P 2-4
    tbl[l  ].splice(c,2,4,4);//**
    tbl[l+1].splice(c,2,4,4);//**
    tbl[l+2].splice(c+1,1,4);// *
                             //
                             //
    break;
    case 27://Bloc R 1-1
    tbl[l  ].splice(c,1,5);    //*
    tbl[l+1].splice(c,3,5,5,5);//***
    tbl[l+2].splice(c+1,1,5);  // *
                               //
                               //
    break;
    case 28://Bloc R 1-2
    tbl[l  ].splice(c+1,1,5);  // *
    tbl[l+1].splice(c+1,2,5,5);// **
    tbl[l+2].splice(c,2,5,5);  //**
                               //
                               //
    break;
    case 29://Bloc R 1-3
    tbl[l  ].splice(c+1,1,5);  // *
    tbl[l+1].splice(c,3,5,5,5);//***
    tbl[l+2].splice(c+2,1,5);  //  *
                               //
                               //
    break;
    case 30://Bloc R 1-4
    tbl[l  ].splice(c+1,2,5,5);// **
    tbl[l+1].splice(c,2,5,5);  //**
    tbl[l+2].splice(c+1,1,5);  // *
                               //
                               //
    break;
    case 31://Bloc R 2-1
    tbl[l  ].splice(c+2,1,5);  //  *
    tbl[l+1].splice(c,3,5,5,5);//***
    tbl[l+2].splice(c+1,1,5);  // *
                               //
                               //
    break;
    case 32://Bloc R 2-2
    tbl[l  ].splice(c,2,5,5);  //**
    tbl[l+1].splice(c+1,2,5,5);// **
    tbl[l+2].splice(c+1,1,5);  // *
                               //
                               //
    break;
    case 33://Bloc R 2-3
    tbl[l  ].splice(c+1,1,5);  // *
    tbl[l+1].splice(c,3,5,5,5);//***
    tbl[l+2].splice(c,1,5);    //*
                               //
                               //
    break;
    case 34://Bloc R 2-4
    tbl[l  ].splice(c+1,1,5);  // *
    tbl[l+1].splice(c,2,5,5);  //**
    tbl[l+2].splice(c+1,2,5,5);// **
                               //
                               //
    break;
    case 35://Bloc Z 1-1
    tbl[l  ].splice(c,1,6);     //*
    tbl[l+1].splice(c,3,6,6,6); //***
    tbl[l+2].splice(c+2,1,6);   //  *
                                //
                                //
    break;
    case 36://Bloc Z 1-2
    tbl[l  ].splice(c+1,2,6,6); // **
    tbl[l+1].splice(c+1,1,6);   // *
    tbl[l+2].splice(c,2,6,6);   //**
                                //
                                //
    break;
    case 37://Bloc Z 2-1
    tbl[l  ].splice(c+2,1,6);   //  *
    tbl[l+1].splice(c,3,6,6,6); //***
    tbl[l+2].splice(c,1,6);     //*
                                //
                                //
    break;
    case 38://Bloc Z 2-2
    tbl[l  ].splice(c,2,6,6);   //**
    tbl[l+1].splice(c+1,1,6);   // *
    tbl[l+2].splice(c+1,2,6,6); // **
                                //
                                //
    break;
    case 39://Bloc U 1-1
    tbl[l  ].splice(c,1,7);    //* *
    tbl[l  ].splice(c+2,1,7);  //***
    tbl[l+1].splice(c,3,7,7,7);//
                               //
                               //
                               //
    break;
    case 40://Bloc U 1-2
    tbl[l  ].splice(c,2,7,7);//**
    tbl[l+1].splice(c+1,1,7);// *
    tbl[l+2].splice(c,2,7,7);//**
                             //
                             //
    break;
    case 41://Bloc U 1-3
    tbl[l  ].splice(c,3,7,7,7);//***
    tbl[l+1].splice(c,1,7);    //* *
    tbl[l+1].splice(c+2,1,7);  //
                               //
                               //
    break;
    case 42://Bloc U 1-4
    tbl[l  ].splice(c,2,7,7);//**
    tbl[l+1].splice(c,1,7);  //*
    tbl[l+2].splice(c,2,7,7);//**
                             //
                             //
    break;
    case 43://Bloc S 1-1
    tbl[l  ].splice(c,3,8,8,8);//***
    tbl[l+1].splice(c+2,2,8,8);//  **
                               //
                               //
                               //
    break;
    case 44://Bloc S 1-2
    tbl[l  ].splice(c+1,1,8);// *
    tbl[l+1].splice(c,2,8,8);//**
    tbl[l+2].splice(c,1,8);  //*
    tbl[l+3].splice(c,1,8);  //*
                             //
    break;
    case 45://Bloc S 1-3
    tbl[l  ].splice(c,2,8,8);    //**
    tbl[l+1].splice(c+1,3,8,8,8);// ***
                                 //
                                 //
                                 //
    break;
    case 46://Bloc S 1-4
    tbl[l  ].splice(c+1,1,8);// *
    tbl[l+1].splice(c+1,1,8);// *
    tbl[l+2].splice(c,2,8,8);//**
    tbl[l+3].splice(c,1,8);  //*
                             //
    break;
    case 47://Bloc S 2-1
    tbl[l  ].splice(c+1,3,8,8,8);// ***
    tbl[l+1].splice(c,2,8,8);    //**
                                 //
                                 //
                                 //
    break;
    case 48://Bloc S 2-2
    tbl[l  ].splice(c,1,8);  //*
    tbl[l+1].splice(c,1,8);  //*
    tbl[l+2].splice(c,2,8,8);//**
    tbl[l+2].splice(c+1,1,8);// *
                             //
    break;
    case 49://Bloc S 2-3
    tbl[l  ].splice(c+2,2,8,8);//  **
    tbl[l+1].splice(c,3,8,8,8);//***
                               //
                               //
                               //
    break;
    case 50://Bloc S 2-4
    tbl[l  ].splice(c,1,8);  //*
    tbl[l+1].splice(c,2,8,8);//**
    tbl[l+2].splice(c+1,1,8);// *
    tbl[l+3].splice(c+1,1,8);// *
                             //
    break;
    case 51://Bloc V 1-1
    tbl[l  ].splice(c,3,9,9,9);//***
    tbl[l+1].splice(c+2,1,9);  //  *
    tbl[l+2].splice(c+2,1,9);  //  *
                               //
                               //
    break;
    case 52://Bloc V 1-2
    tbl[l  ].splice(c+2,1,9);  //  *
    tbl[l+1].splice(c+2,1,9);  //  *
    tbl[l+2].splice(c,3,9,9,9);//***
                               //
                               //
    break;
    case 53://Bloc V 1-3
    tbl[l  ].splice(c,1,9);    //*
    tbl[l+1].splice(c,1,9);    //*
    tbl[l+2].splice(c,3,9,9,9);//***
                               //
                               //
    break;
    case 54://Bloc V 1-4
    tbl[l  ].splice(c,3,9,9,9);//***
    tbl[l+1].splice(c,1,9);    //*
    tbl[l+2].splice(c,1,9);    //*
                               //
                               //
    break;
    case 55://Bloc X 1-1
    tbl[l  ].splice(c+1,1,10);    // *
    tbl[l+1].splice(c,3,10,10,10);//***
    tbl[l+2].splice(c+1,1,10);    // *
                                  //
                                  //
    break;
    case 56://Bloc W 1-1
    tbl[l  ].splice(c,1,11);     //*
    tbl[l+1].splice(c,2,11,11);  //**
    tbl[l+2].splice(c+1,2,11,11);// **
                                 //
                                 //
    break;
    case 57://Bloc W 1-2
    tbl[l  ].splice(c+2,1,11);   //  *
    tbl[l+1].splice(c+1,2,11,11);// **
    tbl[l+2].splice(c,2,11,11);  //**
                                 //
                                 //
    break;
    case 58://Bloc W 1-3
    tbl[l  ].splice(c,2,11,11);  //**
    tbl[l+1].splice(c+1,2,11,11);// **
    tbl[l+2].splice(c+2,1,11);   //  *
                                 //
                                 //
    break;
    case 59://Bloc W 1-4
    tbl[l  ].splice(c+1,2,11,11);// **
    tbl[l+1].splice(c,2,11,11);  //**
    tbl[l+2].splice(c,1,11);     //*
                                 //
                                 //
    break;
    case 60://Bloc T 1-1
    tbl[l  ].splice(c,3,12,12,12);//***
    tbl[l+1].splice(c+1,1,12);    // *
    tbl[l+2].splice(c+1,1,12);    // *
                                  //
                                  //
    break;
    case 61://Bloc T 1-2
    tbl[l  ].splice(c,1,12);      //*
    tbl[l+1].splice(c,3,12,12,12);//***
    tbl[l+2].splice(c,1,12);      //*
                                  //
                                  //
    break;
    case 62://Bloc T 1-3
    tbl[l  ].splice(c+1,1,12);    // *
    tbl[l+1].splice(c+1,1,12);    // *
    tbl[l+2].splice(c,3,12,12,12);//***
                                  //
                                  //
    break;
    case 63://Bloc T 1-4
    tbl[l  ].splice(c+2,1,12);    //  *
    tbl[l+1].splice(c,3,12,12,12);//***
    tbl[l+2].splice(c+2,1,12);    //  *
                                  //
                                  //
    break;
    default:
    break;
  }
  console.log(`Nouveau bloc n°${no} (ligne ${l}, colonne ${c}).`);
}
/******************************************************************************/
/* Suppression d'un bloc. */
function sprPentomino(no=0,l=0,c=0,tbl=grille)
{
  switch (no)
  {
    case 0 ://Vide.
    break;
    case 1 ://Bloc I 1-1
    tbl[l  ].splice(c,1,0);//*
    tbl[l+1].splice(c,1,0);//*
    tbl[l+2].splice(c,1,0);//*
    tbl[l+3].splice(c,1,0);//*
    tbl[l+4].splice(c,1,0);//*
    break;
    case 2 ://Bloc I 2-1
    tbl[l  ].splice(c,5,0,0,0,0,0);//*****
                                   //
                                   //
                                   //
                                   //
    break;
    case 3 ://Bloc Y 1-1
    tbl[l  ].splice(c,1,0);  //*
    tbl[l+1].splice(c,2,0,0);//**
    tbl[l+2].splice(c,1,0);  //*
    tbl[l+3].splice(c,1,0);  //*
                             //
    break;
    case 4 ://Bloc Y 1-2
    tbl[l  ].splice(c+1,1,0);    // *
    tbl[l+1].splice(c,4,0,0,0,0);//****
                                 //
                                 //
                                 //
    break;
    case 5 ://Bloc Y 1-3
    tbl[l  ].splice(c+1,1,0);// *
    tbl[l+1].splice(c+1,1,0);// *
    tbl[l+2].splice(c,2,0,0);//**
    tbl[l+3].splice(c+1,1,0);// *
                             //
    break;
    case 6 ://Bloc Y 1-4
    tbl[l  ].splice(c,4,0,0,0,0);//****
    tbl[l+1].splice(c+2,1,0);    //  *
                                 //
                                 //
                                 //
    break;
    case 7 ://Bloc Y 2-1
    tbl[l  ].splice(c+1,1,0);// *
    tbl[l+1].splice(c,2,0,0);//**
    tbl[l+2].splice(c+1,1,0);// *
    tbl[l+3].splice(c+1,1,0);// *
                             //
    break;
    case 8 ://Bloc Y 2-2
    tbl[l  ].splice(c,4,0,0,0,0);//****
    tbl[l+1].splice(c+1,1,0);    // *
                                 //
                                 //
                                 //
    break;
    case 9 ://Bloc Y 2-3
    tbl[l  ].splice(c,1,0);  //*
    tbl[l+1].splice(c,1,0);  //*
    tbl[l+2].splice(c,2,0,0);//**
    tbl[l+3].splice(c,1,0);  //*
                             //
    break;
    case 10://Bloc Y 2-4
    tbl[l  ].splice(c+2,1,0);    //  *
    tbl[l+1].splice(c,4,0,0,0,0);//****
                                 //
                                 //
                                 //
    break;
    case 11://Bloc Q 1-1
    tbl[l  ].splice(c,4,0,0,0,0);//****
    tbl[l+1].splice(c+3,1,0);    //   *
                                 //
                                 //
                                 //
    break;
    case 12://Bloc Q 1-2
    tbl[l  ].splice(c,2,0,0);//**
    tbl[l+1].splice(c,1,0);  //*
    tbl[l+2].splice(c,1,0);  //*
    tbl[l+3].splice(c,1,0);  //*
                             //
    break;
    case 13://Bloc Q 1-3
    tbl[l  ].splice(c,1,0);      //*
    tbl[l+1].splice(c,4,0,0,0,0);//****
                                 //
                                 //
                                 //
    break;
    case 14://Bloc Q 1-4
    tbl[l  ].splice(c+1,1,0);// *
    tbl[l+1].splice(c+1,1,0);// *
    tbl[l+2].splice(c+1,1,0);// *
    tbl[l+3].splice(c,2,0,0);//**
                             //
    break;
    case 15://Bloc Q 2-1
    tbl[l  ].splice(c,4,0,0,0,0);//****
    tbl[l+1].splice(c,1,0);      //*
                                 //
                                 //
                                 //
    break;
    case 16://Bloc Q 2-2
    tbl[l  ].splice(c,1,0);  //*
    tbl[l+1].splice(c,1,0);  //*
    tbl[l+2].splice(c,1,0);  //*
    tbl[l+3].splice(c,2,0,0);//**
                             //
    break;
    case 17://Bloc Q 2-3
    tbl[l  ].splice(c+3,1,0);    //   *
    tbl[l+1].splice(c,4,0,0,0,0);//****
                                 //
                                 //
                                 //
    break;
    case 18://Bloc Q 2-4
    tbl[l  ].splice(c,2,0,0);//**
    tbl[l+1].splice(c+1,1,0);// *
    tbl[l+2].splice(c+1,1,0);// *
    tbl[l+3].splice(c+1,1,0);// *
                             //
    break;
    case 19://Bloc P 1-1
    tbl[l  ].splice(c,3,0,0,0);//***
    tbl[l+1].splice(c+1,2,0,0);// **
                               //
                               //
                               //
    break;
    case 20://Bloc P 1-2
    tbl[l  ].splice(c,2,0,0);//**
    tbl[l+1].splice(c,2,0,0);//**
    tbl[l+2].splice(c,1,0);  //*
                             //
                             //
    break;
    case 21://Bloc P 1-3
    tbl[l  ].splice(c,2,0,0);   //**
    tbl[l+1].splice(c,3,0,0,0); //***
                                //
                                //
                                //
    break;
    case 22://Bloc P 1-4
    tbl[l  ].splice(c+1,1,0);// *
    tbl[l+1].splice(c,2,0,0);//**
    tbl[l+2].splice(c,2,0,0);//**
                             //
                             //
    break;
    case 23://Bloc P 2-1
    tbl[l  ].splice(c,3,0,0,0);//***
    tbl[l+1].splice(c,2,0,0);  //**
                               //
                               //
                               //
    break;
    case 24://Bloc P 2-2
    tbl[l  ].splice(c,1,0);  //*
    tbl[l+1].splice(c,2,0,0);//**
    tbl[l+2].splice(c,2,0,0);//**
                             //
                             //
    break;
    case 25://Bloc P 2-3
    tbl[l  ].splice(c+1,2,0,0);// **
    tbl[l+1].splice(c,3,0,0,0);//***
                               //
                               //
                               //
    break;
    case 26://Bloc P 2-4
    tbl[l  ].splice(c,2,0,0);//**
    tbl[l+1].splice(c,2,0,0);//**
    tbl[l+2].splice(c+1,1,0);// *
                             //
                             //
    break;
    case 27://Bloc R 1-1
    tbl[l  ].splice(c,1,0);    //*
    tbl[l+1].splice(c,3,0,0,0);//***
    tbl[l+2].splice(c+1,1,0);  // *
                               //
                               //
    break;
    case 28://Bloc R 1-2
    tbl[l  ].splice(c+1,1,0);  // *
    tbl[l+1].splice(c+1,2,0,0);// **
    tbl[l+2].splice(c,2,0,0);  //**
                               //
                               //
    break;
    case 29://Bloc R 1-3
    tbl[l  ].splice(c+1,1,0);  // *
    tbl[l+1].splice(c,3,5,0,0);//***
    tbl[l+2].splice(c+2,1,0);  //  *
                               //
                               //
    break;
    case 30://Bloc R 1-4
    tbl[l  ].splice(c+1,2,0,0);// **
    tbl[l+1].splice(c,2,0,0);  //**
    tbl[l+2].splice(c+1,1,0);  // *
                               //
                               //
    break;
    case 31://Bloc R 2-1
    tbl[l  ].splice(c+2,1,0);  //  *
    tbl[l+1].splice(c,3,0,0,0);//***
    tbl[l+2].splice(c+1,1,0);  // *
                               //
                               //
    break;
    case 32://Bloc R 2-2
    tbl[l  ].splice(c,2,0,0);  //**
    tbl[l+1].splice(c+1,2,0,0);// **
    tbl[l+2].splice(c+1,1,0);  // *
                               //
                               //
    break;
    case 33://Bloc R 2-3
    tbl[l  ].splice(c+1,1,0);  // *
    tbl[l+1].splice(c,3,0,0,0);//***
    tbl[l+2].splice(c,1,0);    //*
                               //
                               //
    break;
    case 34://Bloc R 2-4
    tbl[l  ].splice(c+1,1,0);  // *
    tbl[l+1].splice(c,2,0,0);  //**
    tbl[l+2].splice(c+1,2,0,0);// **
                               //
                               //
    break;
    case 35://Bloc Z 1-1
    tbl[l  ].splice(c,1,0);     //*
    tbl[l+1].splice(c,3,0,0,0); //***
    tbl[l+2].splice(c+2,1,0);   //  *
                                //
                                //
    break;
    case 36://Bloc Z 1-2
    tbl[l  ].splice(c+1,2,0,0); // **
    tbl[l+1].splice(c+1,1,0);   // *
    tbl[l+2].splice(c,2,0,0);   //**
                                //
                                //
    break;
    case 37://Bloc Z 2-1
    tbl[l  ].splice(c+2,1,0);   //  *
    tbl[l+1].splice(c,3,0,0,0); //***
    tbl[l+2].splice(c,1,0);     //*
                                //
                                //
    break;
    case 38://Bloc Z 2-2
    tbl[l  ].splice(c,2,0,0);   //**
    tbl[l+1].splice(c+1,1,0);   // *
    tbl[l+2].splice(c+1,2,0,0); // **
                                //
                                //
    break;
    case 39://Bloc U 1-1
    tbl[l  ].splice(c,1,0);    //* *
    tbl[l  ].splice(c+2,1,0);  //***
    tbl[l+1].splice(c,3,0,0,0);//
                               //
                               //
                               //
    break;
    case 40://Bloc U 1-2
    tbl[l  ].splice(c,2,0,0);//**
    tbl[l+1].splice(c+1,1,0);// *
    tbl[l+2].splice(c,2,0,0);//**
                             //
                             //
    break;
    case 41://Bloc U 1-3
    tbl[l  ].splice(c,3,0,0,0);//***
    tbl[l+1].splice(c,1,0);    //* *
    tbl[l+1].splice(c+2,1,0);  //
                               //
                               //
    break;
    case 42://Bloc U 1-4
    tbl[l  ].splice(c,2,0,0);//**
    tbl[l+1].splice(c,1,0);  //*
    tbl[l+2].splice(c,2,0,0);//**
                             //
                             //
    break;
    case 43://Bloc S 1-1
    tbl[l  ].splice(c,3,0,0,0);//***
    tbl[l+1].splice(c+2,2,0,0);//  **
                               //
                               //
                               //
    break;
    case 44://Bloc S 1-2
    tbl[l  ].splice(c+1,1,0);// *
    tbl[l+1].splice(c,2,0,0);//**
    tbl[l+2].splice(c,1,0);  //*
    tbl[l+3].splice(c,1,0);  //*
                             //
    break;
    case 45://Bloc S 1-3
    tbl[l  ].splice(c,2,0,0);    //**
    tbl[l+1].splice(c+1,3,0,0,0);// ***
                                 //
                                 //
                                 //
    break;
    case 46://Bloc S 1-4
    tbl[l  ].splice(c+1,1,0);// *
    tbl[l+1].splice(c+1,1,0);// *
    tbl[l+2].splice(c,2,0,0);//**
    tbl[l+3].splice(c,1,0);  //*
                             //
    break;
    case 47://Bloc S 2-1
    tbl[l  ].splice(c+1,3,0,0,0);// ***
    tbl[l+1].splice(c,2,0,0);    //**
                                 //
                                 //
                                 //
    break;
    case 48://Bloc S 2-2
    tbl[l  ].splice(c,1,0);  //*
    tbl[l+1].splice(c,1,0);  //*
    tbl[l+2].splice(c,2,0,0);//**
    tbl[l+2].splice(c+1,1,0);// *
                             //
    break;
    case 49://Bloc S 2-3
    tbl[l  ].splice(c+2,2,0,0);//  **
    tbl[l+1].splice(c,3,0,0,0);//***
                               //
                               //
                               //
    break;
    case 50://Bloc S 2-4
    tbl[l  ].splice(c,1,0);  //*
    tbl[l+1].splice(c,2,0,0);//**
    tbl[l+2].splice(c+1,1,0);// *
    tbl[l+3].splice(c+1,1,0);// *
                             //
    break;
    case 51://Bloc V 1-1
    tbl[l  ].splice(c,3,0,0,0);//***
    tbl[l+1].splice(c+2,1,0);  //  *
    tbl[l+2].splice(c+2,1,0);  //  *
                               //
                               //
    break;
    case 52://Bloc V 1-2
    tbl[l  ].splice(c+2,1,0);  //  *
    tbl[l+1].splice(c+2,1,0);  //  *
    tbl[l+2].splice(c,3,0,0,0);//***
                               //
                               //
    break;
    case 53://Bloc V 1-3
    tbl[l  ].splice(c,1,0);    //*
    tbl[l+1].splice(c,1,0);    //*
    tbl[l+2].splice(c,3,0,0,0);//***
                               //
                               //
    break;
    case 54://Bloc V 1-4
    tbl[l  ].splice(c,3,0,0,0);//***
    tbl[l+1].splice(c,1,0);    //*
    tbl[l+2].splice(c,1,0);    //*
                               //
                               //
    break;
    case 55://Bloc X 1-1
    tbl[l  ].splice(c+1,1,0);    // *
    tbl[l+1].splice(c,3,10,0,0); //***
    tbl[l+2].splice(c+1,1,0);    // *
                                 //
                                 //
    break;
    case 56://Bloc W 1-1
    tbl[l  ].splice(c,1,0);     //*
    tbl[l+1].splice(c,2,0,0);   //**
    tbl[l+2].splice(c+1,2,0,0); // **
                                //
                                //
    break;
    case 57://Bloc W 1-2
    tbl[l  ].splice(c+2,1,0);   //  *
    tbl[l+1].splice(c+1,2,0,0); // **
    tbl[l+2].splice(c,2,0,0);   //**
                                //
                                //
    break;
    case 58://Bloc W 1-3
    tbl[l  ].splice(c,2,0,0);   //**
    tbl[l+1].splice(c+1,2,0,0); // **
    tbl[l+2].splice(c+2,1,0);   //  *
                                //
                                //
    break;
    case 59://Bloc W 1-4
    tbl[l  ].splice(c+1,2,0,0); // **
    tbl[l+1].splice(c,2,0,0);   //**
    tbl[l+2].splice(c,1,0);     //*
                                //
                                //
    break;
    case 60://Bloc T 1-1
    tbl[l  ].splice(c,3,0,0,0);//***
    tbl[l+1].splice(c+1,1,0);    // *
    tbl[l+2].splice(c+1,1,0);    // *
                                  //
                                  //
    break;
    case 61://Bloc T 1-2
    tbl[l  ].splice(c,1,0);     //*
    tbl[l+1].splice(c,3,0,0,0); //***
    tbl[l+2].splice(c,1,0);     //*
                                //
                                //
    break;
    case 62://Bloc T 1-3
    tbl[l  ].splice(c+1,1,0);   // *
    tbl[l+1].splice(c+1,1,0);   // *
    tbl[l+2].splice(c,3,0,0,0); //***
                                //
                                //
    break;
    case 63://Bloc T 1-4
    tbl[l  ].splice(c+2,1,0);   //  *
    tbl[l+1].splice(c,3,0,0,0); //***
    tbl[l+2].splice(c+2,1,0);   //  *
                                //
                                //
    break;
    default:
    break;
  }
  console.log(`Suppression du bloc n°${no} (ligne ${l}, colonne ${c}).`);
}
/******************************************************************************/
/* Ensemble des fonctions de contrôle. */
/* Accès à droite ? */
function accesADroite(no=0,l=0,c=0,tbl=grille)
{
  let acces = false;
  switch (no)
  {
    case 0 ://Vide.
    break;
    case 1 ://Bloc I 1-1
    if ( tbl[l][c+1] === 0 && //*
      tbl[l+1][c+1] === 0 &&  //*
      tbl[l+2][c+1] === 0 &&  //*
      tbl[l+3][c+1] === 0 )   //*
    {                         //*
      acces = true;
    }
    break;
    case 2 ://Bloc I 1-2
    if ( tbl[l][c+5] === 0 ) //*****
    {                        //
      acces = true;          //
    }                        //
    break;                   //
    case 3 ://Bloc Y 1-1
    if ( tbl[l][c+1] === 0 && //*
      tbl[l+1][c+2] === 0 &&  //**
      tbl[l+2][c+1] === 0 &&  //*
      tbl[l+3][c+1] === 0 )   //*
    {                         //
      acces = true;
    }
    break;
    case 4 ://Bloc Y 1-2
    if ( tbl[l][c+2] === 0 && // *
      tbl[l+1][c+4] === 0 )   //****
    {                         //
      acces = true;           //
    }                         //
    break;
    case 5 ://Bloc Y 1-3
    if ( tbl[l][c+2] === 0 && // *
      tbl[l+1][c+2] === 0 &&  // *
      tbl[l+2][c+2] === 0 &&  //**
      tbl[l+3][c+2] === 0 )   // *
    {                         //
      acces = true;
    }
    break;
    case 6 ://Bloc Y 1-4
    if ( tbl[l][c+4] === 0 && //****
      tbl[l+1][c+3] === 0 )   //  *
    {                         //
      acces = true;           //
    }                         //
    break;
    case 7 ://Bloc Y 2-1
    if ( tbl[l][c+2] === 0 && // *
      tbl[l+1][c+2] === 0 &&  //**
      tbl[l+2][c+2] === 0 &&  // *
      tbl[l+3][c+2] === 0 )   // *
    {                         //
      acces = true;
    }
    break;
    case 8 ://Bloc Y 2-2
    if ( tbl[l][c+4] === 0 && //****
      tbl[l+1][c+2] === 0 )   // *
    {                         //
      acces = true;           //
    }                         //
    break;
    case 9 ://Bloc Y 2-3
    if ( tbl[l][c+1] === 0 && //*
      tbl[l+1][c+1] === 0 &&  //*
      tbl[l+2][c+2] === 0 &&  //**
      tbl[l+3][c+1] === 0 )   //*
    {                         //
      acces = true;
    }
    break;
    case 10://Bloc Y 2-4
    if ( tbl[l][c+2] === 0 && //  *
      tbl[l+1][c+4] === 0 )   //****
    {                         //
      acces = true;           //
    }                         //
    break;
    default:
    break;
  }
  if (acces)
  {
    console.log(`Un bloc n°${no} (ligne ${l} et colonne ${c}) peut se décaler à droite.`);
  }
  else
  {
    console.warn(`Un bloc n°${no} (ligne ${l} et colonne ${c}) est obstrué à droite!`);
  }
  return acces;
}
/* Accès à gauche ? */
function accesAGauche(no=0,l=0,c=0,tbl=grille)
{
  let acces = false;
  switch (no)
  {
    case 0 ://Vide.
    break;
    case 1 ://Bloc I 1-1
    if ( tbl[l][c-1] === 0 && //*
      tbl[l+1][c-1] === 0 &&  //*
      tbl[l+2][c-1] === 0 &&  //*
      tbl[l+3][c-1] === 0 )   //*
    {                         //*
      acces = true;
    }
    break;
    case 2 ://Bloc I 1-2
    if ( tbl[l][c-1] === 0 ) //*****
    {                        //
      acces = true;          //
    }                        //
    break;                   //
    case 3 ://Bloc Y 1-1
    if ( tbl[l][c-1] === 0 && //*
      tbl[l+1][c-1] === 0 &&  //**
      tbl[l+2][c-1] === 0 &&  //*
      tbl[l+3][c-1] === 0 )   //*
    {                         //
      acces = true;
    }
    break;
    case 4 ://Bloc Y 1-2
    if ( tbl[l][c] === 0 && // *
      tbl[l+1][c-1] === 0 ) //****
    {                       //
      acces = true;         //
    }                       //
    break;
    case 5 ://Bloc Y 1-3
    if ( tbl[l][c] === 0 &&  // *
      tbl[l+1][c] === 0 &&   // *
      tbl[l+2][c-1] === 0 && //**
      tbl[l+3][c] === 0 )    // *
    {                        //
      acces = true;
    }
    break;
    case 6 ://Bloc Y 1-4
    if ( tbl[l][c-1] === 0 && //****
      tbl[l+1][c+1] === 0 )   //  *
    {                         //
      acces = true;           //
    }                         //
    break;
    case 7 ://Bloc Y 2-1
    if ( tbl[l][c] === 0 &&  // *
      tbl[l+1][c-1] === 0 && //**
      tbl[l+2][c] === 0 &&   // *
      tbl[l+3][c] === 0 )    // *
    {                        //
      acces = true;
    }
    break;
    case 8 ://Bloc Y 2-2
    if ( tbl[l][c+4] === 0 && //****
      tbl[l+1][c+2] === 0 )   // *
    {                         //
      acces = true;           //
    }                         //
    break;
    case 9 ://Bloc Y 2-3
    if ( tbl[l][c-1] === 0 && //*
      tbl[l+1][c-1] === 0 &&  //*
      tbl[l+2][c-1] === 0 &&  //**
      tbl[l+3][c-1] === 0 )   //*
    {                         //
      acces = true;
    }
    break;
    case 10://Bloc Y 2-4
    if ( tbl[l][c+1] === 0 && //  *
      tbl[l+1][c-1] === 0 )   //****
    {                         //
      acces = true;           //
    }                         //
    break;
    default:
    break;
  }
  if (acces)
  {
    console.log(`Un bloc n°${no} (ligne ${l} et colonne ${c}) peut se décaler à gauche.`);
  }
  else
  {
    console.warn(`Un bloc n°${no} (ligne ${l} et colonne ${c}) est obstrué à gauche!`);
  }
  return acces;
}
/* Accès en bas ? */
function accesEnBas(no=0,l=0,c=0,tbl=grille)
{
  let acces = false;
  switch (no)
  {
    case 0 ://Vide.
    break;
    case 1 ://Bloc I 1-1
    if ( tbl[l+5][c] === 0 ) //*
    {                        //*
      acces = true;          //*
    }                        //*
    break;                   //*
    case 2 ://Bloc I 1-2
    if ( tbl[l+1][c] === 0 && //*****
      tbl[l+1][c+1] === 0 &&  //
      tbl[l+1][c+2] === 0 &&  //
      tbl[l+1][c+3] === 0 &&  //
      tbl[l+1][c+4] === 0 )   //
    {
      acces = true;
    }
    break;
    case 3 ://Bloc Y 1-1
    if ( tbl[l+4][c] === 0 && //*
      tbl[l+2][c+1] === 0 )   //**
    {                         //*
      acces = true;           //*
    }                         //
    break;
    case 4 ://Bloc Y 1-2
    if ( tbl[l+2][c] === 0 && // *
      tbl[l+2][c+1] === 0 &&  //****
      tbl[l+2][c+2] === 0 &&  //
      tbl[l+2][c+3] === 0 )   //
    {                         //
      acces = true;
    }
    break;
    case 5 ://Bloc Y 1-3
    if ( tbl[l+3][c] === 0 && // *
      tbl[l+4][c] === 0 )     // *
    {                         //**
        acces = true;         // *
    }                         //
    break;
    case 6 ://Bloc Y 1-4
    if ( tbl[l+1][c] === 0 && //****
      tbl[l+1][c+1] === 0 &&  //  *
      tbl[l+2][c+2] === 0 &&  //
      tbl[l+1][c+3] === 0 )   //
    {                         //
      acces = true;
    }
    break;
    case 7 ://Bloc Y 2-1
    if ( tbl[l+2][c] === 0 && // *
      tbl[l+4][c+1] === 0 )   //**
    {                         // *
      acces = true;           // *
    }                         //
    break;
    case 8 ://Bloc Y 2-2
    if ( tbl[l+1][c] === 0 && //****
      tbl[l+2][c+1] === 0 &&  // *
      tbl[l+1][c+2] === 0 &&  //
      tbl[l+1][c+3] === 0 )   //
    {                         //
      acces = true;
    }
    break;
    case 9 ://Bloc Y 2-3
    if ( tbl[l+4][c] === 0 && //*
      tbl[l+3][c+1] === 0 )   //*
    {                         //**
      acces = true;           //*
    }                         //
    break;
    case 10://Bloc Y 2-4
    if ( tbl[l+2][c] === 0 && //  *
      tbl[l+2][c+1] === 0 &&  //****
      tbl[l+2][c+2] === 0 &&  //
      tbl[l+2][c+3] === 0 )   //
    {                         //
      acces = true;
    }
    break;
    default:
    break;
  }
  if (acces)
  {
    console.log(`Un bloc n°${no} (ligne ${l} et colonne ${c}) peut se décaler à gauche.`);
  }
  else
  {
    console.warn(`Un bloc n°${no} (ligne ${l} et colonne ${c}) est obstrué à gauche!`);
  }
  return acces;
}
/******************************************************************************/
/* Dessin des pentominos sur la toile. */
/* Contexte de la toile. */
var ctx = document.querySelector("#toile").getContext('2d');
const fc = {x:100, y:700};//Centre du groupe de flèches.
const bc = {x:400, y:600};//Centre du groupe de boutons circulaires.
const ec = {x:250, y:550};//Centre du groupe de boutons elliptiques.
function premDessin()
{
  /* Flèches. */
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(fc.x+50,fc.y);
  ctx.lineTo(fc.x+25,fc.y+25);
  ctx.lineTo(fc.x+25,fc.y-25);
  ctx.lineTo(fc.x+50,fc.y);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(fc.x-50,fc.y);
  ctx.lineTo(fc.x-25,fc.y-25);
  ctx.lineTo(fc.x-25,fc.y+25);
  ctx.lineTo(fc.x-50,fc.y);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(fc.x,fc.y+50);
  ctx.lineTo(fc.x-25,fc.y+25);
  ctx.lineTo(fc.x+25,fc.y+25);
  ctx.lineTo(fc.x,fc.y+50);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(fc.x,fc.y-50);
  ctx.lineTo(fc.x+25,fc.y-25);
  ctx.lineTo(fc.x-25,fc.y-25);
  ctx.lineTo(fc.x,fc.y-50);
  ctx.fill();
  ctx.strokeStyle = "pink";
  ctx.beginPath();
  ctx.arc(fc.x,fc.y,50,0,Math.PI*2,true);
  ctx.stroke();
  /* Boutons circulaires. */
  ctx.beginPath();
  ctx.arc(bc.x+20,bc.y-20,20,0,Math.PI*2,true);
  ctx.arc(bc.x-20,bc.y+20,20,0,Math.PI*2,true);
  ctx.fill();
  /* Boutons elliptique. */
  ctx.beginPath();
  ctx.ellipse(ec.x+30,ec.y,10,20,Math.PI/2,0,Math.PI*2,true);
  ctx.ellipse(ec.x-30,ec.y,10,20,Math.PI/2,0,Math.PI*2,true);
  ctx.fill();
  /* Cadre pour les blocs. */
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(600,0);
  ctx.lineTo(600,300+(100*5/3));
  ctx.lineTo(0,300+(100*5/3));
  ctx.lineTo(0,0);
  ctx.lineTo(50,50);
  ctx.lineTo(50,250+(100*5/3));
  ctx.lineTo(550,250+(100*5/3));
  ctx.lineTo(550,50);
  ctx.lineTo(50,50);
  ctx.lineTo(0,0);
  ctx.fill();
}
premDessin();
/******************************************************************************/
function tblDessin(tbl=grille)
{
  ctx.clearRect(50,50,500,200+(100*5/3));
  const lx = 500/40;//Longueur x. 40 unités.
  const ly = (200+(100*5/3))/24;//Longueur y. 24 unités.
  const tblLY = tbl.length;//Lignes y du tableau.
  const tblLX = tbl[0].length;//Colonnes x du tableau.
  for(let l=0; l<tblLY; l=l+1)
  {
    for(let c=0; c<tblLX; c=c+1)
    {
      switch(tbl[l][c])
      {
        case 1 :
        ctx.fillStyle = "#eb9947";//321
        break;
        case 2 :
        ctx.fillStyle = "#ebeb47";//331
        break;
        case 3 :
        ctx.fillStyle = "#99eb47";//231
        break;
        case 4 :
        ctx.fillStyle = "#47eb47";//131
        break;
        case 5 :
        ctx.fillStyle = "#47eb99";//132
        break;
        case 6 :
        ctx.fillStyle = "#47ebeb";//133
        break;
        case 7 :
        ctx.fillStyle = "#4799eb";//123
        break;
        case 8 :
        ctx.fillStyle = "#4747eb";//113
        break;
        case 9 :
        ctx.fillStyle = "#9947eb";//213
        break;
        case 10:
        ctx.fillStyle = "#eb47eb";//313
        break;
        case 11:
        ctx.fillStyle = "#eb4799";//312
        break;
        case 12:
        ctx.fillStyle = "#eb4747";//311
        break;
        default:
        ctx.fillStyle = "#000000";//000
        break;
      }
      ctx.fillRect(50+lx*c,50+ly*l,lx,ly);
    }
  }
}
/******************************************************************************/
/* Interaction avec les touches. */
var cx = 0;//Coordonnée X du curseur.
var cy = 0;//Coordonnée Y du curseur.
function suivre(trace)//Coordonnées du curseur.
{
  cx = trace.offsetX;
  cy = trace.offsetY;
}
function action(frappe)//Clic sur un bouton.
{
  /* Si dans les flèches. */
  /* Flèche du haut. */
  if(cx < fc.x+50 && cx > fc.x-50 && cy < fc.y+50 && cy > fc.y-50)
  {
    console.log(`Curseur dans les flèches (x=${cx} y=${cy}).`);
  }
  if(cx < fc.x+50 && cx > fc.x-50 && cy < fc.y+50 && cy > fc.y-50)
  {
    console.log(`Curseur dans les flèches (x=${cx} y=${cy}).`);
  }
  if(cx < fc.x+50 && cx > fc.x-50 && cy < fc.y+50 && cy > fc.y-50)
  {
    console.log(`Curseur dans les flèches (x=${cx} y=${cy}).`);
  }
  if(cx < fc.x+50 && cx > fc.x-50 && cy < fc.y+50 && cy > fc.y-50)
  {
    console.log(`Curseur dans les flèches (x=${cx} y=${cy}).`);
  }
  /* Si dans les cercles. */
  if(cx < bc.x+40 && cx > bc.x-40 && cy < bc.y+40 && cy > bc.y-40)
  {
    console.log(`Curseur dans les cercles (x=${cx} y=${cy}).`);
  }
  /* Si dans les ellipses. */
  if(cx < ec.x+40 && cx > ec.x-40 && cy < ec.y+20 && cy > ec.y-20)
  {
    console.log(`Curseur dans les ellipses (x=${cx} y=${cy}).`);
  }

}
/* Écouteur de position. */
document.querySelector("#toile").addEventListener("mousemove", suivre);
/* Écouteur de clic. */
document.querySelector("#toile").addEventListener("click", action);
/* Construction du tableau secondaire :
 *  un pentomino est construit dans un
 *  tableau mobile.
 */
var pento = {//Pentomino nul.
  l:0,//Ligne d'origine.
  c:0,//Colonne d'origine.
  mtx:[//Sous-tableau mobile.
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
};
nvPentomino(1,1,0,grille);
tblEcrire(grille);//Matrice initiale.
tblDessin(grille);
var accesd = accesADroite(1,1,0,grille);
var accesg = accesAGauche(1,1,0,grille);
sprPentomino(1,1,0,grille);
function essai(no)
{
  sprPentomino(no,0,0,grille);
  nvPentomino(no+1,0,0,grille);
  tblEcrire(grille);
  tblDessin(grille);
}
var no=0;
var boucle = window.setInterval( ()=>{no++; essai(no);}, 1000);
window.setTimeout( ()=>{window.clearInterval(boucle);}, 64000);
console.log("Fin.");
