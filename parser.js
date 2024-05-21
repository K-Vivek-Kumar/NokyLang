"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Num = exports.BinOp = exports.AST = exports.Parser = void 0;
var AST = /** @class */ (function () {
    function AST(token) {
        this.token = token;
    }
    return AST;
}());
exports.AST = AST;
var BinOp = /** @class */ (function (_super) {
    __extends(BinOp, _super);
    function BinOp(left, op, right) {
        var _this = _super.call(this, op) || this;
        _this.left = left;
        _this.op = op;
        _this.right = right;
        return _this;
    }
    return BinOp;
}(AST));
exports.BinOp = BinOp;
var Num = /** @class */ (function (_super) {
    __extends(Num, _super);
    function Num(token) {
        var _this = _super.call(this, token) || this;
        _this.value = parseInt(token.value, 10);
        return _this;
    }
    return Num;
}(AST));
exports.Num = Num;
var Parser = /** @class */ (function () {
    function Parser(lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }
    Parser.prototype.error = function () {
        throw new Error('Invalid syntax');
    };
    Parser.prototype.eat = function (tokenType) {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.lexer.getNextToken();
        }
        else {
            this.error();
        }
    };
    Parser.prototype.factor = function () {
        var token = this.currentToken;
        if (token.type === 'INTEGER') {
            this.eat('INTEGER');
            return new Num(token);
        }
        else if (token.type === 'LPAREN') {
            this.eat('LPAREN');
            var node = this.expr();
            this.eat('RPAREN');
            return node;
        }
    };
    Parser.prototype.term = function () {
        var node = this.factor();
        while (['MULTIPLY', 'DIVIDE'].includes(this.currentToken.type)) {
            var token = this.currentToken;
            if (token.type === 'MULTIPLY') {
                this.eat('MULTIPLY');
            }
            else if (token.type === 'DIVIDE') {
                this.eat('DIVIDE');
            }
            node = new BinOp(node, token, this.factor());
        }
        return node;
    };
    Parser.prototype.expr = function () {
        var node = this.term();
        while (['PLUS', 'MINUS'].includes(this.currentToken.type)) {
            var token = this.currentToken;
            if (token.type === 'PLUS') {
                this.eat('PLUS');
            }
            else if (token.type === 'MINUS') {
                this.eat('MINUS');
            }
            node = new BinOp(node, token, this.term());
        }
        return node;
    };
    Parser.prototype.parse = function () {
        return this.expr();
    };
    return Parser;
}());
exports.Parser = Parser;
