var qs = require("querystring");

var qs = require("querystring");

function index(req, res) {
  //console.log ("Numeros impares de 1 a 100");
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
  });
  res.write('<a href="http://localhost:8888/aleatorios">ALEATÓRIOS</a><br>');
  res.write('<a href="http://localhost:8888/primos">PRIMOS</a><br>');
  res.write('<a href="http://localhost:8888/sobre">SOBRE</a><br>');
  res.write('<a href="http://localhost:8888/equacao">EQUAÇÃO</a><br>');
  res.end();
}


function sobre(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
  });
  res.write('<a href="http://localhost:8888/" >voltar</a><br>');
  res.write("<p>Nome : Marluce Aparecida Vitor</p>");
  res.write("<p>Matricula : 201276026</p>");
  res.write("<p>E-mail :marlucevitor@ice.ufjf.br</p>");
  res.write("<p>Curso : Sistemas de Informação</p>");

  res.end();
}

function aleatorios(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
  });
  res.write('<a href="http://localhost:8888/" >voltar</a><br>');
  var par = [];
  var impar = [];
  for (i = 0; i < 100; i++) {
    var x = Math.floor((Math.random() * 100) + 1);
    if (x % 2 == 0) {
      par[i] = x;

    } else {

      impar[i] = x;
    }
  }

  var resultadopar = par.filter(function(ele) {
    return ele !== undefined;
  });
  res.write("<p> Os valores pares são:[" + resultadopar + "]</p><br>");
  var resultadoimpar = impar.filter(function(ele) {
    return ele !== undefined;
  });
  res.write("<p> Os valores impares são:[ " + resultadoimpar + "]</p><br>");

  res.end();
}

function ePrimo(x) {

  for (var i = x - 1; i > 1; i--) {
    if (x % i === 0) return false;
  }
  return (x==1)?false:true;
}


function primos(req, res) {
  var http = require('http');
  var url = require('url');


  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
  });
  res.write("<a href='http://localhost:8888/'>HOME</a> <br>");
  res.write("Passa os parametros pela url usando: n1 e n2!ATENÇÃO VALORES MENORES DO QUE 100 e n1 precisa ser menor que n2 !!<br><br> <br><br>");

  var queryData = url.parse(req.url, true).query;
  var ini = parseInt(queryData.n1);
  var fim = parseInt(queryData.n2);
  var l = 0;
  var i = 0;

  if ((0<ini) && (ini < fim) && (fim < 100)) {
    res.write("os numeros primos são:");
    for (i = ini; i <= fim; i++) {
      if (ePrimo(i)) {
        res.write("<li>" + i + "</li>")
      }
    }
    /*
            if (((i % l) != 0) || (i == 2) )
        	{

        	for (l=1;l<=i;l++)
        	   {
        		if ((i % l) == 0)
        		{
        			if (l == i) {res.write(i + "  ");}
        			else
        			{
        				if ( l != 1) { break }
        			}
        		}
         	   }
        	}

    }*/
  } else {
    res.write("Pois pode ocorrer uns dos erros abaixos....<br>");
    res.write("O valor digitado não obedeceu umas das regras :Primeiro numero ser menor que o segundo,Ambos valores(N1 && N2) serem menor que 100!!!Valores ausentes. Ou você digitou errado os paramentros via URL ");
  }

  res.end();


}



function equacao(req, res) {
  if (req.method == "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });
    res.write("<h1>Passe os parâmetros de acordo a função de segundo grau: ax²+bx+c = 0</h1>");
    res.write("<form method=post>");
    res.write("<h1>Digite o valor de AX: </h1>");
    res.write("<input type=text name=valor01 />");
    res.write("<h1>Digite o valor de BY: </h1>");
    res.write("<input type=text name=valor02 />");
    res.write("<h1>Digite o valor de C: </h1>");
    res.write("<input type=text name=valor03 />");

    res.write("<input type=submit />");
    res.write("</form>");
    res.end();
  } else {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      var dados = qs.parse(body);
      console.log(dados.valor01, dados.valor02, dados.valor03);
      var dados1 = parseFloat(dados.valor01);
      var dados2 = parseFloat(dados.valor02);
      var dados3 = parseFloat(dados.valor03);
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
      });
      /*
      if ((dados1 == "") || (dados1 == " ")) {
        dados1 = 0;
      } else if ((dados2 == "") || (dados2 == " ")) {
        dados2 = 0;
      } else if ((dados3 == "") || (dados3 == " ")) {
        dados3 = 0;
      }
*/
      delta = ((dados2 * dados2) - (4 * (dados1) * (dados3)));
      if(delta>=0){
      raiz = Math.sqrt(delta, 2);
        x1 = (-dados2 - raiz / (2 * dados1));
        x2 = (-dados2 + raiz / (2 * dados1));

      res.write("<P>" + "VALOR DE A = " + dados1 + "</P>");
      res.write("<P>" + "VALOR DE B = " + dados2 + "</P>");
      res.write("<P>" + "VALOR DE C = " + dados3 + "</P>");
      res.write("<P>" + "VALOR DE DELTA = " + delta + "</P>");
      res.write("<P>" + "RAIZ DE DELTA = " + raiz.toFixed(2) + "</P>");
      res.write("<P>" + "VALOR DE X LINHA = " + x1.toFixed(2) + "</P>");
      res.write("<P>" + "VALOR DE X DUAS LINHAS = " + x2.toFixed(2) + "</P>");
    }

      if (delta < 0) {
        res.write("<P>" + "RAÍZES REAIS IMAGINÁRIAS." + "</P>");
      } else if (delta == 0) {
        res.write("<P>" + "RAIZ COMUM." + "</P>");
      } else {
        res.write("<P>" + " ============> RAÍZES REAIS DIFERENTES." + "</P>");
      }

      res.end();
    })
  }
}


function naoEncontrado(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
  });
  res.write("Recurso não encontrado!");
  res.end();
}


exports.index = index;
exports.sobre = sobre;
exports.aleatorios = aleatorios;
exports.primos = primos;
exports.equacao = equacao;
exports.naoEncontrado = naoEncontrado;
