var qs = require("querystring");
//var qs = require("querystring");


function index(req, res) {
  //console.log ("Numeros impares de 1 a 100");
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
  });
  res.write('<a href="/aleatorios">ALEATÓRIOS</a><br>');
  res.write('<a href="/primos">PRIMOS</a><br>');
  res.write('<a href="/equacao">EQUAÇÃO</a><br>');
  res.write('<a href="/xadrez">XADREZ</a><br>');
  res.write('<a href="/sobre">SOBRE</a><br>');
  res.end();
}



function aleatorios(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
  });
  res.write('<a href="/" >voltar</a><br>');
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
  res.write("<a href='/'>HOME</a> <br>");
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
      res.write("<a href='/'>HOME</a> <br>");
    res.write("<h2>Passe os parâmetros de acordo a função de segundo grau: ax²+bx+c = 0</h2>");
    res.write("<form method=post>");
    res.write("<h2>Digite o valor de AX: </h2>");
    res.write("<input type=text name=valor01 />");
    res.write("<h2>Digite o valor de BY: </h2>");
    res.write("<input type=text name=valor02 />");
    res.write("<h2>Digite o valor de C: </h2>");
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
      res.write("<a href='/'>HOME</a> <br>");
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

      res.write("<p>" + "VALOR DE A = " + dados1 + "</p>");
      res.write("<p>" + "VALOR DE B = " + dados2 + "</p>");
      res.write("<p>" + "VALOR DE C = " + dados3 + "</p>");
      res.write("<p>" + "VALOR DE DELTA = " + delta + "</p>");
      res.write("<p>" + "RAIZ DE DELTA = " + raiz.toFixed(2) + "</p>");
      res.write("<p>" + "VALOR DE X LINHA = " + x1.toFixed(2) + "</p>");
      res.write("<p>" + "VALOR DE X DUAS LINHAS = " + x2.toFixed(2) + "</p>");
      if (delta < 0) {
        res.write("<p>" + "RAÍZES REAIS IMAGINÁRIAS." + "</p>");
      } else if (delta == 0) {
        res.write("<p>" + "RAIZ COMUM." + "</p>");
      } else {
        res.write("<p>" + " ============> RAÍZES REAIS DIFERENTES." + "</p>");
      }
    }else {
      res.write("usuário você  inseriu valores inválidos ou omitiu informação!!!");
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

function sobre(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
  });
  res.write('<a href="/" >voltar</a><br>');
  res.write("<p>Nome : Marluce Aparecida Vitor</p>");
  res.write("<p>Matricula : 201276026</p>");
  res.write("<p>E-mail :marlucevitor@ice.ufjf.br</p>");
  res.write("<p>Curso : Sistemas de Informação</p>");

  res.end();
}

// function MontarTabuleiro(req, res) {
//       res.write("<table style='width:320'>");
//       for(var i = 0;i<8;i++){
// //cascade
//         res.write("<tr >");
//        for(var j = 0;j<8;j++){
//          if((j%2===0 && i%2===1) || (j%2===1 && i%2===0)){
//     			res.write("<td width = '40' height = '40' style='border:1px solid black' bgcolor =  '#FFFFFF'>");
//         }else {
//           res.write("<td width = '40' height = '40' style='border:1px solid black' bgcolor =   '#000000'  >");
//
//         }
//           res.write("</td>");
//        }
//   			res.write("</tr>");
//       }
//
// 			res.write("</table>");
// }
//
//
// function xadrez(req, res) {
//   res.writeHead(200, {
//     "Content-Type": "text/html; charset=utf-8"
//   });
//   res.write('<a href="/" >voltar</a><br>');
//  MontarTabuleiro(req, res);
// }

function montarTabuleiro(l, c){

  var matriz = [];
  for(var i=0; i<8; i++) {
    matriz[i] = [];

    for(var j=0; j<8; j++) {
      matriz[i][j] = 0;
    }
  }

    matriz[l][c] = 1;

    //if(l===2 && c===2)
    //if(l>=0 && c>=0)
   //{
    matriz[l-1][c-2]=2;
		matriz[l+1][c+2]=2;
		matriz[l+1][c-2]=2;
		matriz[l-1][c+2]=2;
		matriz[l-2][c-1]=2;
		matriz[l+2][c+1]=2;
		matriz[l+2][c-1]=2;
		matriz[l-2][c+1]=2;
//}else{


//}
//tratar as excessões
//else {
//  matriz[l][c] = 2;
//}

return matriz;
}

function desenhaTabuleiroHTML(tabuleiro, res){
  res.write("<table>");
  for (var i = 0; i < tabuleiro.length; i++) {
    res.write("<tr>");
    for (var j = 0; j < tabuleiro[i].length; j++) {
      res.write("<td>");
      switch (tabuleiro[i][j]) {
        case 1:
          res.write("C");
          break;
        case 2:
          res.write("X");
          break;
        default:
        res.write("");
      }
      res.write("</td>");
    }
    res.write("</tr>");
  }
  res.write("</table>");
}

function tabuleiroHTML(req, res){
  var body = '';
  req.on('data', function( data) {
    body += data;
  });
  req.on('end', function() {
    var pegarValor = qs.parse(body);
    var lin = parseInt(pegarValor.coluna);
    var col = parseInt(pegarValor.linha);
    var mat = montarTabuleiro(lin, col);
    desenhaTabuleiroHTML(mat, res);
    res.end();
  });
}

function xadrezHandler(req, res){
  if(req.method === 'POST'){
    tabuleiroHTML(req, res);
  }else{
    formTabuleiro(req, res);
  }
}

function tabuleiroJSON(req, res){
  var http = require('http');
  var url = require('url');
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
  });
  var queryData = url.parse(req.url, true).query;
  var lin = parseInt(queryData.lin);
  var col = parseInt(queryData.col);
  var matriz = [lin][col];
  var mat = montarTabuleiro(lin,col);
  res.writeHead(200, {"Content-Type":"application/json"});
  res.write(JSON.stringify(mat));
  res.end();
}
function MontarTabuleiro(matriz, res) {
	res.write("<style type='text/css'>");
	res.write(" td{ font-size: 46px; line-height: 50px; text-align:center;}");
  res.write(".branca {width:50px; height:50px; border-radius: 10px; border: 1px solid;}");
	res.write(".preta {width:50px; height:50px; border-radius: 10px; border: 1px solid; background-color: #000000; color: #FFFFFF;}  </style>");
  res.write("</style>");


	for (var i=0; i<8; i++){
			res.write("<table>");
			res.write("<tr>");
		for (var j=0; j<8; j++){

			res.write("<td>");

			if(matriz[i][j] == 0) {
				if(i%2 == 0) { //lin
					if(j%2 == 0) { //col
						res.write("<div class='branca'></div>");
					} else {
						res.write("<div class='preta'></div>");
					}
				} else {
					if(j%2 == 0) {
						res.write("<div class='preta'></div>");
					} else {
						res.write("<div class='branca'></div>");
					}
				}
			} else if(matriz[i][j] == 1) { //cavalo
				if(i%2 == 0) { //lin
					if(j%2 == 0) { //col
						res.write("<div class='branca'>&#x2658;</div>");
					} else {
						res.write("<div class='preta'>&#x2658;</div>");
					}
				} else {
					if(j%2 == 0) {
						res.write("<div class='preta'>&#x2658;</div>");
					} else {
						res.write("<div class='branca'>&#x2658;</div>");
					}
				}
			} else if(matriz[i][j] == 2) { //movimentos validos
				if(i%2 == 0) { //lin
					if(j%2 == 0) { //col
						res.write("<div class='branca'>X</div>");
					} else {
						res.write("<div class='preta'>X</div>");
					}
				} else {
					if(j%2 == 0) {
						res.write("<div class='preta'>X</div>");
					} else {
						res.write("<div class='branca'>X</div>");
					}
				}
			}

			res.write("</td>");
		}
			res.write("</tr>");
			res.write("</table>");

	}
}


function xadrez(req, res) {
	if(req.method == "GET"){
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<form method=post >");
		res.write("<table>");
		res.write("<tr><td>Coluna:</td><td><select type=number name=coluna  />");
		res.write("<option value=0 >1</option>");
		res.write("<option value=1 >2</option>");
		res.write("<option value=2 >3</option>");
		res.write("<option value=3 >4</option>");
		res.write("<option value=4 >5</option>");
		res.write("<option value=5 >6</option>");
		res.write("<option value=6 >7</option>");
		res.write("<option value=7 >8</option>");
		res.write("</select></td></tr>");
		res.write("<tr><td>Linha:</td><td><select type=number name=linha  />");
		res.write("<option value=0 >1</option>");
		res.write("<option value=1 >2</option>");
		res.write("<option value=2 >3</option>");
		res.write("<option value=3 >4</option>");
		res.write("<option value=4 >5</option>");
		res.write("<option value=5 >6</option>");
		res.write("<option value=6 >7</option>");
		res.write("<option value=7 >8</option>");
		res.write("</select></td></tr>");
		res.write("</table>");
		res.write("<input type=submit />");
		res.write("</form>");
	res.write("<a href='/'>HOME</a> <br>");



	var matriz = [];
	for(var i=0; i<8; i++) {
		matriz[i] = [];

		for(var j=0; j<8; j++) {
			matriz[i][j] = 0;
		}
	}



	MontarTabuleiro(matriz, res);
	res.end();

	} else {
    var body = '';
    req.on('data', function( data) {
      body += data;
    });
    req.on('end', function() {
      var pegarValor = qs.parse(body);
      var lin = parseInt(pegarValor.coluna);
      var col = parseInt(pegarValor.linha);


	  var matriz = [];
		for(var i=0; i<8; i++) {
			matriz[i] = [];

			for(var j=0; j<8; j++) {

				if (i == lin-2 && j == col-1) {
				  matriz[lin-2][col-1] = 2;

			  } else if(i == lin-2 && j == col+1) {
				  matriz[lin-2][col+1] = 2;

			  } else if(i == lin-1 && j == col-2) {
				  matriz[lin-1][col-2] = 2;

			  } else if(i == lin-1 && j == col+2) {
				  matriz[lin-1][col+2] = 2;

			  } else if(i == lin+1 && j == col-2) {
				  matriz[lin+1][col-2] = 2;

			  } else if(i == lin+1 && j == col+2) {
				  matriz[lin+1][col+2] = 2;

			  } else if(i == lin+2 && j == col-1) {
				  matriz[lin+2][col-1] = 2;

			  } else if(i == lin+2 && j == col+1) {
				  matriz[lin+2][col+1] = 2;
			  } else if(i == lin && j == col) {
				matriz[i][j] = 1;
			  } else {
				  matriz[i][j] = 0;
			  }
			}
		}
	 res.writeHead(200, {"Content-Type": "text/html"});
	  res.write("<a href='/'>HOME</a> <br>");
	  MontarTabuleiro(matriz, res);
    res.write("<a href='/xadrez.json?lin="+lin+"&&col="+col+"'>IR PARA APLICATION/JSON</a> <br>");
	  res.end();
    })

  }
}

//function xadrezjson(req, res){
//res.setHeader('Content-Type','application/json');
//}

exports.index = index;
exports.sobre = sobre;
exports.aleatorios = aleatorios;
exports.primos = primos;
exports.equacao = equacao;
exports.xadrez = xadrez;
//exports.xadrezjson = xadrezjson;
exports.naoEncontrado = naoEncontrado;
exports.tabuleiroJSON = tabuleiroJSON;
