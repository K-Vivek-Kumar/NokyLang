import { Lexer, Token } from './lexer';

class AST {
    token: Token;
    constructor(token: Token) {
        this.token = token;
    }
}

class BinOp extends AST {
    left: AST;
    op: Token;
    right: AST;

    constructor(left: AST, op: Token, right: AST) {
        super(op);
        this.left = left;
        this.op = op;
        this.right = right;
    }
}

class Num extends AST {
    value: number;
    constructor(token: Token) {
        super(token);
        this.value = parseInt(token.value, 10);
    }
}

class Parser {
    lexer: Lexer;
    currentToken: Token;

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }

    error() {
        throw new Error('Invalid syntax');
    }

    eat(tokenType: string) {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.lexer.getNextToken();
        } else {
            this.error();
        }
    }

    factor() {
        const token = this.currentToken;
        if (token.type === 'INTEGER') {
            this.eat('INTEGER');
            return new Num(token);
        } else if (token.type === 'LPAREN') {
            this.eat('LPAREN');
            const node = this.expr();
            this.eat('RPAREN');
            return node;
        }
    }

    term() {
        let node = this.factor();

        while (['MULTIPLY', 'DIVIDE'].includes(this.currentToken.type)) {
            const token = this.currentToken;
            if (token.type === 'MULTIPLY') {
                this.eat('MULTIPLY');
            } else if (token.type === 'DIVIDE') {
                this.eat('DIVIDE');
            }

            node = new BinOp(node, token, this.factor());
        }

        return node;
    }

    expr() {
        let node = this.term();

        while (['PLUS', 'MINUS'].includes(this.currentToken.type)) {
            const token = this.currentToken;
            if (token.type === 'PLUS') {
                this.eat('PLUS');
            } else if (token.type === 'MINUS') {
                this.eat('MINUS');
            }

            node = new BinOp(node, token, this.term());
        }

        return node;
    }

    parse() {
        return this.expr();
    }
}

export { Parser, AST, BinOp, Num };
