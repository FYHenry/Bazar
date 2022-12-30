#!/bin/env node
var http = require('http');
var url = require('url');
var fs = require('fs');
var console = require('console');
console.log('Bonjour.');
function deployment(req, res)//À déployer.
{
  var myURL = url.parse(req.url, true);//URL récupéré.
  var name = myURL.query.name;//Option 'name'.
  console.log('Début.');
  console.log("L'adresse est\' "+req.url+" \'avec "+myURL.pathname+" pour chemin.");
  /* Contrôle des pages. */
  var uRLTest = (myURL.pathname !== "/Pentis.html") &&//Page principale.
    (myURL.pathname !== "/Pentis.js") &&//JS principal.
    (myURL.pathname !== "/Pentis_sombre.css") &&//CSS sombre.
    (myURL.pathname !== "/Pentis_clair.css") &&//CSS clair.
    (myURL.pathname !== "/Pentis_icone.svg") &&//Icone de page.
    (myURL.pathname !== "/Pentis_404.md") &&//MD 404.
    (myURL.pathname !== "/");//Racine.
  function callback(err, data)
  {
    if(err)
    {
      console.error("Illisible ou inexistant!",err);
      res.writeHead(302, {'Location': '/Pentis_404.md'});
      res.end();
    }
    res.end(data);
  }
  if(uRLTest)//Page absente.
  {
    res.writeHead(302, {'Location': '/Pentis_404.md'});
    res.end();
    console.log("Adresse modifiée : /Pentis_404.md");
  }
  if (myURL.pathname === "/Pentis_sombre.css")//Si on demande le CSS.
  {
    console.log('Début CSS sombre.');
    res.writeHead(200, {'Content-type' : 'text/css;charset=UTF-8', 'Content-Language': 'fr-FR, fr'});
    fs.readFile("Pentis_sombre.css", 'utf8', callback);
    console.log('CSS sombre envoyé.');
  }
  if (myURL.pathname === "/Pentis_clair.css")//Si on demande le CSS.
  {
    console.log('Début CSS clair.');
    res.writeHead(200, {'Content-type' : 'text/css;charset=UTF-8', 'Content-Language': 'fr-FR, fr'});
    fs.readFile("Pentis_clair.css", 'utf8', callback);
    console.log('CSS clair envoyé.');
  }
  if (myURL.pathname === "/Pentis.js")//Si on demande le JS.
  {
    console.log('Début JS.');
    res.writeHead(200, {'Content-type' : 'application/javascript;charset=UTF-8', 'Content-Language': 'fr-FR, fr'});
    fs.readFile("Pentis.js", 'utf8', callback);
    console.log('JS envoyé.');
  }
  if (myURL.pathname === "/Pentis_icone.svg")//Si on demande l'icone SVG.
  {
    console.log('Début icone-SVG.');
    res.writeHead(200, {'Content-type' : 'image/svg+xml;charset=UTF-8', 'Content-Language': 'fr-FR, fr'});
    fs.readFile("Pentis_icone.svg", 'utf8', callback);
    console.log('icone-SVG envoyé.');
  }

  if(myURL.pathname === "/")//Redirection (alias) vers HTML.
  {
    res.writeHead(302, {'Location': '/Pentis.html'});
    res.end();
    console.log("Adresse modifiée : /Pentis.html");
  }
  if(myURL.pathname === "/Pentis.html")//Si on demande le HTML.
  {
    console.log('Début HTML.');
    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8', 'Content-Language': 'fr-FR, fr'});
    fs.readFile('Pentis.html', 'utf8', callback);
    console.log('HTML envoyé.');
    console.log("----------res");
    for(let item in res.headers) 
    {
      console.log(item + ": " + res.headers[item]);
    }
    console.log("----------req");
    for(let item in req.headers) 
    {
      console.log(item + ": " + req.headers[item]);
    }
    console.log("----------\nRequête début:\n"+req.rawHeaders+"\nRequête fin\n----------");
    console.log("----------\nRéponse début:\n"+res.rawHeaders+"\nRéponse fin\n----------");
  }
  if(myURL.pathname === "/Pentis_404.md")//Si on demande le MD 404.
  {
    console.log('Début MD 404.');
    res.writeHead(200, {'Content-Type': 'text/markdown;charset=UTF-8, text/plain;charset=UTF-8', 'Content-Language': 'fr-FR, fr'});
    fs.readFile('Pentis_404.md', 'utf8', callback);
    console.log('MD 404 envoyé.');
  }
  console.log('Fin.');
}
var server = http.createServer(deployment);//Objet serveur à déployer.
var listener = server.listen(1337, '127.0.0.1');//Sur écoute.
console.log('Server running at http://127.0.0.1:1337/');
var opt = {
  host: '127.0.0.1',
  port: '1337',
  path: '/Pentis.html'};
function lecture(res)
{
  console.log('--En-tête de réponse HTTP (HTML)--');
  for(var item in res.headers)
  {
    console.log(item + ": " + res.headers[item]);
  }
  console.log('----');
}
http.get(opt, lecture);
