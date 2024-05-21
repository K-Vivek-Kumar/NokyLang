"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var lexer_1 = require("./lexer");
var parser_1 = require("./parser");
var fileName = 'main.nky';
var text = fs.readFileSync(fileName, 'utf-8');
var lexer = new lexer_1.Lexer(text);
var parser = new parser_1.Parser(lexer);
var ast = parser.parse();
console.log(ast);
