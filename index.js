var server = require("./server");
var router = require("./router");
var requestHandlers = require("./handlers");

var handlers = {};

handlers["/"] = requestHandlers.index;
handlers["/sobre"] = requestHandlers.sobre;
handlers["/aleatorios"] = requestHandlers.aleatorios;
handlers["/primos"] = requestHandlers.primos;
handlers["/equacao"] = requestHandlers.equacao;
handlers["/notfound"] = requestHandlers.naoEncontrado;

server.start(router, handlers);
