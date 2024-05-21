import * as fs from 'fs';
import { Lexer } from './lexer';
import { Parser } from './parser';

const fileName = 'main.nky';
const text = fs.readFileSync(fileName, 'utf-8');
const lexer = new Lexer(text);
const parser = new Parser(lexer);
const ast = parser.parse();

console.log(ast);
