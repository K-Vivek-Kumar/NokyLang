"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.Lexer = void 0;
var Token = /** @class */ (function () {
    function Token(type, value) {
        this.type = type;
        this.value = value;
    }
    return Token;
}());
exports.Token = Token;
var Lexer = /** @class */ (function () {
    function Lexer(text) {
        this.text = text;
        this.pos = 0;
        this.currentChar = this.text[this.pos];
    }
    Lexer.prototype.advance = function () {
        this.pos++;
        if (this.pos < this.text.length) {
            this.currentChar = this.text[this.pos];
        }
        else {
            this.currentChar = null;
        }
    };
    Lexer.prototype.skipWhitespace = function () {
        while (this.currentChar !== null && /\s/.test(this.currentChar)) {
            this.advance();
        }
    };
    Lexer.prototype.integer = function () {
        var result = '';
        while (this.currentChar !== null && /[0-9]/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        return parseInt(result, 10);
    };
    Lexer.prototype.getNextToken = function () {
        while (this.currentChar !== null) {
            if (/\s/.test(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }
            if (/[0-9]/.test(this.currentChar)) {
                return new Token('INTEGER', this.integer().toString());
            }
            if (this.currentChar === '+') {
                this.advance();
                return new Token('PLUS', '+');
            }
            if (this.currentChar === '-') {
                this.advance();
                return new Token('MINUS', '-');
            }
            if (this.currentChar === '*') {
                this.advance();
                return new Token('MULTIPLY', '*');
            }
            if (this.currentChar === '/') {
                this.advance();
                return new Token('DIVIDE', '/');
            }
            throw new Error("Invalid character: ".concat(this.pos));
        }
        return new Token('EOF', '');
    };
    return Lexer;
}());
exports.Lexer = Lexer;
